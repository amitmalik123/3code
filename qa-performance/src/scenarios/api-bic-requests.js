import {BASE_URL} from '../constants'
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {HttpClient} from '../utils/http-client'
import {getRandomArrayItems, shuffleArray} from '../utils/helpers'

const processedAccounts = []

/** 
 * @param authData - context for API session. Contains API login response body
 */
export async function apiBicRequests(authData) {
  // Initialize http clients
  // Regular client (without response body)
  const http = new HttpClient({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json', 'authorization': `Bearer ${authData.access_token}`
    }
  })
  // Client with ability to get response body
  const httpWithRespBody = new HttpClient({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json', 'authorization': `Bearer ${authData.access_token}`
    },
    responseType: 'text'
  })

  // Side requests array. They are not connected to BIC API, but every user that wants to open BIC will use all of them
  const sideGetRequestsArray = [
    '/monitoring/api/v1/cms/ewm-metadata/metadata',
    '/advisormetrics/api/v2/cms/ewm-metadata/menu_items/advisor-workstation',
    '/monitoring/api/v1/cms/ewm-metadata/menu_items/advisor-profile',
    '/monitoring/api/v1/cms/ewm-metadata/menu_items/main',
    '/monitoring/api/v1/dashboard/byuser',
    '/monitoring/api/v1/cms/ewm-metadata/widgets',
    '/monitoring/api/v1/cms/ewm-metadata/side_bar',
    '/monitoring/api/v1/cms/resources/site_modals',
    '/monitoring/api/v1/cms/resources/sitealerts',
    '/monitoring/api/v1/cms/resources/ewm_marketing',
    '/monitoring/api/v1/cms/resources/bic'
  ]
  sideGetRequestsArray.forEach(endpoint => {
    http.get(endpoint)
  })

  // Define variables required for BIC api requests
  let sourceProductId = ''
  let targetProductId = ''
  let productGroupId = ''
  const advisorIds = []
  const suitableAccounts = []

  // Set advisorIds
  const advisorsResponse = httpWithRespBody.get('/advisormetrics/api/v2/metrics/advisors')
  // IF the user has advisor ids THEN the flow continues (Actually all of them should have it)
  if (advisorsResponse.status === 200){
    const advisorsResponseBody = await advisorsResponse.json()
    advisorIds.push(...advisorsResponseBody.data.map(item => item.id))

    // Set sourceProductId
    const investmentsStrategyResponse = httpWithRespBody.get('/advisormetrics/api/v2/metrics/investments/strategy')
    // IF the user's investment widget has data THEN the flow continues
    if (investmentsStrategyResponse.status === 200){
      const investmentsStrategyResponseBody = await investmentsStrategyResponse.json()
      const availableStrategies = investmentsStrategyResponseBody.data.filter(strategy => strategy.isBicEligible === true)

      // IF the user has at least 1 eligible investment strategy THEN the flow continues
      if (availableStrategies.length > 0){
        sourceProductId = randomItem(availableStrategies).strategyId

        // Get data for Destination Investment header
        http.get(`/proposal/api/v1/bic/products/${sourceProductId}`, undefined, {tags:
            {
              title: 'Get product',
              related_url: `/proposal/api/v1/bic/products/{sourceProductId}`
            }})

        // Set targetProductId
        const productsResponse = httpWithRespBody.post('/proposal/api/v1/bic/products',
          {
            sourceProductId,
            advisorIds
          }, {tags: { title: 'Get product list'}})

        // IF the user has a list of products THEN the flow continues
        if (productsResponse.status === 200){
          const productsResponseBody = await productsResponse.json()
          const randomProductsObject = randomItem(productsResponseBody.data)
          productGroupId = randomProductsObject.id
          const isProductGroupFavourite = randomProductsObject.isFavourite
          targetProductId = randomItem(randomProductsObject.products).id

          const favouriteUrl = '/proposal/api/v1/bic/products/favorite'
          const favouriteRelatedUrl = `${favouriteUrl}/{productGroupId}`
          function addToFav(){
            http.patch(`${favouriteUrl}/${productGroupId}`,
              undefined, {
                tags: {
                  title: 'Add product to favourite',
                  related_url: favouriteRelatedUrl
                }
              })
          }
          function removeFromFav(){
            http.delete(`${favouriteUrl}/${productGroupId}?id=${productGroupId}`,
              undefined, {
                tags: {
                  title: 'Remove product from favourite',
                  related_url: favouriteRelatedUrl
                }
              })
          }
          // Add/remove favorite strategy
          isProductGroupFavourite ? removeFromFav() : addToFav()
          isProductGroupFavourite ? addToFav() : removeFromFav()

          // Set accounts
          const accountsResponse = httpWithRespBody.post('/proposal/api/v1/bic/accounts',
            {
              advisorIds,
              sourceProductId,
              targetProductId
            }, {tags: { title: 'Get accounts list'}})

          // IF the user has accounts THEN the flow continues
          if (accountsResponse.status === 200){
            const accountsResponseBody = await accountsResponse.json()
            // Including eligible accounts that require suitability check in accounts array
            const requiredSuitabilityAccounts = accountsResponseBody.data
              .filter(account => account.isBICIneligible === false && account.requiresSuitabilityCheck === true)
              .map(item => item.id)

            // IF user has at least 1 account that requires suitability check THEN the suitability check is included in the flow
            if (requiredSuitabilityAccounts.length > 0){
              // Checking accounts suitability
              const suitabilityCheckResponse = httpWithRespBody.post('/proposal/api/v1/bic/accounts/suitabilitycheck',
                {
                  accounts: getRandomArrayItems(requiredSuitabilityAccounts),
                  sourceProductId,
                  targetProductId
                }, {tags: { title: 'Accounts suitability check'}})
              // IF the accounts list has suitable accounts THEN the flow continues
              if (suitabilityCheckResponse.status === 200){
                const suitabilityCheckResponseBody = await suitabilityCheckResponse.json()

                suitableAccounts.push(...shuffleArray(suitabilityCheckResponseBody.data
                  .filter(account => account.isSuitabilityCheckPassed === true)
                  .map(item => item.accountId)
                )
                )

              }
            }

            // Other eligible accounts that don't require suitability check
            // can be considered as already passed suitability check and included in suitableAccounts array
            suitableAccounts.push(...shuffleArray(accountsResponseBody.data
              .filter(account => account.isBICIneligible === false && account.requiresSuitabilityCheck === false)
              .map(item => item.id)
            )
            )

            // IF user has at least 1 suitable account THEN the flow continues
            if (suitableAccounts.length > 0){
              // EWMBIC-620 To avoid using the same accounts making following suitable accounts filter
              // When backend will not allow to make investment change of the same accounts it can be removed
              const newAccounts = suitableAccounts.filter(item => !processedAccounts.includes(item))
              // End of the user flow.  If user has at least 1 new account (not processed in the past) THEN making investment changes
              if (newAccounts.length > 0){
                const accounts = getRandomArrayItems(newAccounts)
                http.post('/proposal/api/v1/bic/accounts/investmentchange',
                  {
                    accounts,
                    advisorIds,
                    sourceProductId,
                    targetProductId
                  }, {tags: { title: 'Make investment change'}})
                processedAccounts.push(...accounts)
              }
            }

          }
        }
      }
    }
  }
}
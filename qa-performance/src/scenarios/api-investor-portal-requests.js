import { BaseApiRequests } from '../utils/ base-api-requests'
// @ts-ignore
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import { objectsMerge } from '../utils/helpers'

/**
 * @typedef {Object} Household
 * @property {string} id - The unique identifier of the household.
 * @property {string} advisorId - The unique identifier of the advisor.
 * @property {string} name - The name of the household.
 * @property {string} applicationId - The application identifier.
 */

/**
 * @typedef {Object} HouseholdsResponse
 * @property {Household[]} households - An array of household objects.
 */

/**
 * @typedef {Object} MailingAddress
 * @property {string} addressLine1 - The first line of the mailing address.
 * @property {string} [addressLine2] - The second line of the mailing address (optional).
 * @property {string} city - The city of the mailing address.
 * @property {string} state - The state of the mailing address.
 * @property {string} zipCode - The ZIP code of the mailing address.
 */

/**
 * @typedef {Object} Account
 * @property {string} id - The unique identifier for the account.
 * @property {string} name - The name of the account.
 * @property {boolean} isClosed - Whether the account is closed.
 * @property {string} accountNumber - The account number.
 * @property {string} billingMethod - The billing method associated with the account.
 * @property {string} powerOfAttorney - The power of attorney identifier.
 * @property {number} marketValue - The market value of the account.
 * @property {boolean} isFunded - Whether the account is funded.
 * @property {string} taxId - The tax identifier associated with the account.
 * @property {string} registration - The registration identifier.
 * @property {MailingAddress} mailingAddress - The mailing address of the account.
 * @property {string} phoneNumber - The phone number associated with the account.
 * @property {string} inceptionDate - The inception date of the account in YYYY-MM-DD format.
 */

/**
 * @typedef {Object} AccountsResponse
 * @property {Account[]} accounts - An array of account objects.
 */

// Investor Portal API requests class. Made to simulate real user behavior via API
export class InvestorPortalRequests extends BaseApiRequests{
  /**
   * @param {import('../utils/auth').AuthResponse}authData - context for API session. Contains API login response body
   */
  constructor(authData) {
    super(authData)
    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const arr = [
      {
        method: 'GET',
        url: '/monitoring/api/v1/cms/ewm-metadata/menu_items/main'
      }
    ]
    this._sideRequestsArray.push(...arr)
  }

  /**
   * Gets a random household from the API.
   * @returns {Promise<Household>|undefined} Household object if successful, or undefined if not.
   */
  async _getHousehold(){
    const householdsResponse = this._httpWithRespBody.get(`/investorportal/api/v1/authorization/households`)
    // IF get households response is successful THEN the flow continues
    if (householdsResponse.status === 200) {
    /**
     * Get households array
     * 
     * @type {HouseholdsResponse}
     */
      const householdsResponseBody = await householdsResponse.json()
      /**
     * Get random household item from array
     * 
     * @type {Household}
     */
      return randomItem(householdsResponseBody.households)
    } return undefined
  }

  /**
   * Method for executing http requests for investor portal:
   * - Execute side requests
   * - Get household array
   * - Get household's accounts array
   * - Execute requests array(from parameters)
   * @param {import('../utils/http-client').HttpRequest[]} requests - array of target requests objects that need to be executed in scope of current page
   */
  async _executeIpRequests(requests){
    this._executeSideRequests()
    const randomHousehold = await this._getHousehold()
    // IF get households response is successful THEN the flow continues
    if (randomHousehold !== undefined) {
      
      const accountsResponse = this._httpWithRespBody.get(
        `/investorportal/api/v1/households/${randomHousehold.id}/accounts`, null, {
          tags: {
            title: 'GET /investorportal/api/v1/households/{household_id}/accounts',
            related_url: '/investorportal/api/v1/households/{household_id}/accounts'
          }
        })
      for (const request of requests) {
        const defaultParams = {
          tags: {
            title: `${request.method} ${request.url}`,
            related_url: request.url
          }
        }
        const mergedParams = objectsMerge({}, defaultParams, request.params)
        if (request.url.includes('{household_id}')){
          const url = request.url.replace('{household_id}', randomHousehold.id)
          this._http.request(
            request.method,
            url,
            request.body,
            mergedParams
          )

        } else if (request.url.includes('{account_id}') && accountsResponse.status === 200){
          /**
           * Get household's accounts array
           * 
           * @type {AccountsResponse}
           */
          const accountRepsponseBody = await accountsResponse.json()
          /**
           * Get random account
           * 
           * @type {Account}
           */
          const randomAccount = randomItem(accountRepsponseBody.accounts)
          const url = request.url.replace('{account_id}', randomAccount.id)
          this._http.request(
            request.method,
            url,
            request.body,
            mergedParams
          )

        } else {
          this._http.request(
            request.method,
            request.url,
            request.body,
            mergedParams
          )
        }
      }
    }
  }

  /**
   * Make http requests that mimic user behavior:
   * - Get all overview page widget's data 
   */
  async openOverviewPage() {
    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const requestsArray = [
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/marketvalue?timePeriod=Ytd`
      },
      {
        method: 'GET',
        url:  `/investorportal/api/v1/portfolio/{household_id}/assetallocation`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/cumulativereturn?Period=Monthly`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/document/{household_id}/list`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/strategyallocation`
      },
      //... Add missing. When FE will be updated ...
    ]
    await this._executeIpRequests(requestsArray)
  }

  /**
   * Make http requests that mimic user behavior:
   * - Open Portfolio Summary tab
   * - Open Market Value tab -> Use different time periods
   * - Open Holdings tab -> Use different types of grouping (open subttabs)
   * - Open Realized Gain/Loss tab
   * - Open Activity tab (Not implemented yet)
   * - Open Performance tab -> Open subtabs
   */
  async openPortfolioPage() {
    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const portfolioSummaryRequests = [
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/summary`
      },
      //... Add missing. When FE will be updated ...
    ]
    await this._executeIpRequests(portfolioSummaryRequests)

    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const marketValueRequests = [
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/marketvalue?timePeriod=SinceInception`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/marketvalue?timePeriod=3y`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/marketvalue?timePeriod=Ytd`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/marketvalue?timePeriod=ThreeMonths`
      },
    ]
    await this._executeIpRequests(marketValueRequests)

    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const holdingsRequests = [
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/assetallocation`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/accounts/{account_id}/strategyallocation`
      }
    ]
    await this._executeIpRequests(holdingsRequests)

    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const realizedGainOrLossRequests = [
      {
        method: 'POST',
        url: `/investorportal/api/v1/accounts/{account_id}/realizedgainloss`,
        body: {
          timePeriod:'Ytd',
          transactionType:['All','ShortTerm','LongTerm','DividendInterestIncome','Unclassified']
        }
      }
    ]
    await this._executeIpRequests(realizedGainOrLossRequests)

    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const activityRequests = [
      //... Add missing. When FE will be updated ...
    ]
    await this._executeIpRequests(activityRequests)

    /**
     * @type {import('../utils/http-client').HttpRequest[]}
     */
    const performanceRequests = [
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/rateofreturn`
      },
      {
        method: 'GET',
        url: `/investorportal/api/v1/portfolio/{household_id}/cumulativereturn`
      }
    ]
    await this._executeIpRequests(performanceRequests)
  }

  /**
   * Make http requests that mimic user behavior:
   * - ...
   * */
  async openDocumentsPage() {
    throw new Error('Method "openDocumentsPage" is not implemented')
  }

  /**
   * Make http requests that mimic user behavior:
   * - ...
   * */
  async openGoalsPage() {
    throw new Error('Method "openGoalsPage" is not implemented')
  }

}
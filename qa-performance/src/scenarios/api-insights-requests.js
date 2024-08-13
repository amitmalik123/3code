import {BASE_URL, THINK_TIME} from '../constants'
import {ApiInsightsPayload} from '../payloads/api-insights-payload'
import {getEwmAdvisorCodes} from '../utils/auth'
import {HttpClient} from '../utils/http-client'
import {sleep} from 'k6'
import {InsightsLiteHttpClient} from '../utils/insights-lite-http-client'

export async function apiInsightsRequests(authData) {

  const http = new HttpClient({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authData.access_token}`
    },
  })
  
  http.batch([
    ['GET','/monitoring/api/v1/cms/ewm-metadata/metadata'],
    ['GET','/advisormetrics/api/v2/cms/ewm-metadata/menu_items/advisor-workstation'],
    ['GET','/monitoring/api/v1/cms/ewm-metadata/menu_items/advisor-profile'],
    ['GET','/monitoring/api/v1/cms/ewm-metadata/menu_items/main'],
  ])

  const codes = await getEwmAdvisorCodes(authData)
  
  http.batch([
    ['GET','/monitoring/api/v1/cms/ewm-metadata/widgets'],
    ['GET','/monitoring/api/v1/cms/resources/ewm_pages'],
  ])

  http.batch([
    ['GET','/monitoring/api/v2/dashboards?dashboardId=assets'],
    ['GET','/monitoring/api/v2/dashboards?dashboardId=fees'],
    ['GET','/monitoring/api/v2/dashboards?dashboardId=flows'],
  ])
  
  const insightsHttp = new InsightsLiteHttpClient({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authData.access_token}`,
      'Ewm-Advisors-Codes': `${codes}`
    },
  })

  const insightsHttpWithRespBody = new InsightsLiteHttpClient({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authData.access_token}`,
      'Ewm-Advisors-Codes': `${codes}`
    },
    responseType: 'text',
  })

  const payload = new ApiInsightsPayload()

  //Assets Tab Requests
  insightsHttp.batchGraphqlRequests([
    payload.aopTotalMktValue,
    payload.aopCAGR
  ])

  const aopLineOfBusinessResponse = insightsHttpWithRespBody.graphqlRequest(payload.aopLineOfBusiness)
  const aopInvestmentManagerResponse = insightsHttpWithRespBody.graphqlRequest(payload.aopInvestmentManager)
  const aopInvestmentApproachResponse = insightsHttpWithRespBody.graphqlRequest(payload.aopInvestmentApproach)

  sleep(THINK_TIME)

  // Assets Tab drill down requests
  if (aopLineOfBusinessResponse.status === 200) {
    insightsHttp.graphqlRequest(
      payload.aopLineOfBusinessDrillDown(
        await aopLineOfBusinessResponse.json()
      )
    )
  }
  if (aopInvestmentManagerResponse.status === 200) {
    insightsHttp.graphqlRequest(
      payload.aopInvestmentManagerDrillDown(
        await aopInvestmentManagerResponse.json()
      )
    )
  }
  if (aopInvestmentApproachResponse.status === 200) {
    insightsHttp.graphqlRequest(
      payload.aopInvestmentApproachDrillDown(
        await aopInvestmentApproachResponse.json()
      )
    )
  }

  sleep(THINK_TIME)
  
  //Fees Tab Requests
  insightsHttp.batchGraphqlRequests([
    payload.feesAnalysisHousehold,
    payload.feesType,
    payload.feesLastQuarterYoY,
  ])
  const yearlyFeesResponse = insightsHttpWithRespBody.graphqlRequest(payload.feesLast5Years)

  sleep(THINK_TIME) 

  // Fees Tab drill down requests
  insightsHttp.graphqlRequest(payload.feesAnalysisTableDrillDown)

  if (yearlyFeesResponse.status === 200){
    insightsHttp.graphqlRequest(
      payload.feesLast5YearsMontlyDrilldown(
        await yearlyFeesResponse.json()
      )
    )
  }

  sleep(THINK_TIME) 
  
  //Flows Tab Requests
  insightsHttp.batchGraphqlRequests([
    payload.netFlowsDetails,
    payload.flowsLastQuarterYoY,
  ])
  const inflowsOutflowsResponse = insightsHttpWithRespBody.graphqlRequest(payload.inflowsOutflows)

  sleep(THINK_TIME)

  // Flows Tab drill down requests
  insightsHttp.graphqlRequest(payload.inflowsOutflowsDrillDown)

  if (inflowsOutflowsResponse.status === 200){
    insightsHttp.graphqlRequest(
      payload.netflowsMontlyDrilldown(
        await inflowsOutflowsResponse.json()
      )
    )
  }
}

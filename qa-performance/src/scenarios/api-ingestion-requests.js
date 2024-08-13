import {BASE_URL} from '../constants'
import {Ingestion} from '../payloads/api-ingestion-payload.js'
import {HttpClient} from '../utils/http-client'

/** 
 * @param authData - context for API session. Contains API login response body
 */

export async function apiIngestionRequests(authData) {

  const apis = [
    {
      name: 'Verify UpsertOrganization - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsert-organization',
      payload: new Ingestion().getJsonPayload.upsertOrganization_Valid_Payload
    },
    {
      name: 'Verify Virtual Account - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsert-virtualaccount',
      payload: new Ingestion().getJsonPayload.virtualAccount_Valid_Payload
    },
    {
      name: 'Verify Upsert Source Account - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsertsourceaccount',
      payload: new Ingestion().getJsonPayload.upsertSourceAccount_ValidPayload
    },
    {
      name: 'Verify Upsert User - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsert-user',
      payload: new Ingestion().getJsonPayload.upsertUser_ValidPayload
    },
    {
      name: 'Verify Upsert Holdings - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsertholdings',
      payload: new Ingestion().getJsonPayload.upsertHoldings_Payload
    },
    {
      name: 'Ingestion. Verify Marketvalue - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/marketvalue',
      payload: new Ingestion().getJsonPayload.marketValue_Payload
    },
    {
      name: 'Ingestion. Verify Fee - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/fee',
      payload: new Ingestion().getJsonPayload.fee_Payload
    },
    {
      name: 'Verify Upsert Product - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/upsert-product',
      payload: new Ingestion().getJsonPayload.upsertProduct_Payload
    },
    {
      name: 'Verify Benefit Level - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/benefitlevel',
      payload: new Ingestion().getJsonPayload.benefitLevel_Payload
    },
    {
      name: 'Verify Flows - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/flows',
      payload: new Ingestion().getJsonPayload.flows_Payload
    },
    {
      name: 'Verify Summary Performance - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/summaryperformance',
      payload: new Ingestion().getJsonPayload.summaryPerformance_Payload
    },
    {
      name: 'Verify Investment Manager - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/investmentmanager',
      payload: new Ingestion().getJsonPayload.investmentManager_Payload
    },
    {
      name: 'Verify Product Family - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/productfamily',
      payload: new Ingestion().getJsonPayload.productFamily_Payload
    },
    {
      name: 'Verify Work Item - Valid Payload',
      endpoint: '/ingestion/api/v1/produce/workitem',
      payload: new Ingestion().getJsonPayload.workItem_Payload
    }
  ]

  const http = new HttpClient({
    baseURL: BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': `Bearer ${authData.access_token}`}
  })
  for (const apiParams of apis) {
    http.request('PUT', apiParams.endpoint, JSON.stringify(apiParams.payload))

  }
}

import {Counter, Trend} from 'k6/metrics'

export const CREDENTIALS = __ENV.CREDENTIALS ? JSON.parse(__ENV.CREDENTIALS.replace(/'/g, '"')) : [/*{
    username: 'sampleadvisor1', password: 'Test1234t',
}, {
    username: 'sampleadvisor2', password: 'Test1234t',
}, */{
    username: 'sampleadvisor3', password: 'Test1234t',
  }, {
    username: 'sampleadvisor4', password: 'Test1234t',
  }, {
    username: 'sampleadvisor5', password: 'Test1234t',
  }, /*{
    username: 'sampleadvisor11', password: 'Test1234t',
}*/]

export const EWM_2_CREDENTIALS = __ENV.EWM_2_CREDENTIALS ? JSON.parse(__ENV.EWM_2_CREDENTIALS.replace(/'/g, '"')) :
  [
    {
      username: 'sampleadvisor1', password: 'Test1234t',
    }
  ]

export const WIDGETS = {
  abp: {
    title: 'Advisor Benefits Program',
    id: 'advisor_benefits',
    trend: new Trend('tile_ready_time_abp', true),
    counter: new Counter('tile_count_abp'),
    readyCounter: new Counter('tile_ready_count_abp')
  }, 
  aop: {
    title: 'Assets On Platform',
    id: 'aum',
    trend: new Trend('tile_ready_time_aop', true),
    counter: new Counter('tile_count_aop'),
    readyCounter: new Counter('tile_ready_count_aop')
  }, 
  clients: {
    title: 'Clients & Accounts',
    id: 'client_list',
    trend: new Trend('tile_ready_time_clients', true),
    counter: new Counter('tile_count_clients'),
    readyCounter: new Counter('tile_ready_count_clients')
  }, 
  fees: {
    title: 'Fees',
    id: 'revenue',
    trend: new Trend('tile_ready_time_fees', true),
    counter: new Counter('tile_count_fees'),
    readyCounter: new Counter('tile_ready_count_fees')
  }, 
  investments: {
    title: 'Investments', 
    id: 'investments',
    trend: new Trend('tile_ready_time_investments', true),
    counter: new Counter('tile_count_investments'),
    readyCounter: new Counter('tile_ready_count_investments')
  },
  netFlows: {
    title: 'Net Flows',
    id: 'net_flows',
    trend: new Trend('tile_ready_time_netflows', true),
    counter: new Counter('tile_count_netflows'),
    readyCounter: new Counter('tile_ready_count_netflows')
  }, 
  statusAndTracking: {
    title: 'Status & Tracking',
    id: 'status_tracking',
    trend: new Trend('tile_ready_time_status_and_tracking', true),
    counter: new Counter('tile_count_status_and_tracking'),
    readyCounter: new Counter('tile_ready_count_status_and_tracking')
  }
}

export const TARGET_ENV = __ENV.TARGET_ENV || 'uat'

export const TIMEOUT = 30 * 1000

export const BASE_URL = baseURL()
export const LOGIN_PAGE_URL = loginPageUrl()
export const KEYCLOAK_URL = keycloakURL()
export const INGESTION_LOGIN_URL = ingestionLoginURL()
export const INGESTION_CREDENTIALS = ingestionCredentials()
export const CMS_TOKEN = __ENV.CMS_TOKEN
export const BASE_URL_CMS = baseCmsURL()
export const THINK_TIME = __ENV.THINK_TIME? +(__ENV.THINK_TIME) : 10
export const ITERATION_DELAY = __ENV.ITERATION_DELAY? +(__ENV.ITERATION_DELAY)/1000 : 0
export const HTTP_REQUEST_DELAY = __ENV.HTTP_REQUEST_DELAY? +(__ENV.HTTP_REQUEST_DELAY)/1000 : 0
export const HTTP_REQUEST_TIMEOUT = __ENV.HTTP_REQUEST_TIMEOUT? +(__ENV.HTTP_REQUEST_TIMEOUT)*1000 : 20*1000
export const TEST_DATA_CASE = __ENV.TEST_DATA_CASE || 'random'

function baseURL() {
  let baseURL
  switch (TARGET_ENV){
  case 'dev':
    baseURL = 'https://dev.tenant1.ewm3.assetmark.net'
    break
  case 'test':
    baseURL = 'https://test.tenant1.ewm3.assetmark.net'
    break
  case 'uat':
    baseURL = 'https://p01.tenant1.ewm3.assetmark.net'
    break
  case 'prod':
    baseURL = 'https://nextgen.ewealthmanager.com'
    break
  default:
    baseURL = 'https://p01.tenant1.ewm3.assetmark.net'
  }
  return baseURL
}

function loginPageUrl() {
  let baseURL
  switch (TARGET_ENV){
  case 'dev':
    baseURL = 'https://dev11.ewealthmanager.com/ewmLogin/account/login'
    break
  case 'test':
    baseURL = 'https://test11.ewealthmanager.com/ewmLogin/account/login'
    break
  case 'uat':
    baseURL = 'https://launch.ewealthmanager.com/ewmLogin/account/login'
    break
  case 'prod':
    baseURL = 'https://www.ewealthmanager.com/ewmLogin/account/login'
    break
  default:
    baseURL = 'https://launch.ewealthmanager.com/ewmLogin/account/login'
  }
  return baseURL
}

function keycloakURL() {
  let baseURL
  switch (TARGET_ENV){
  case 'dev':
    baseURL = 'https://dev.tenant1.auth.ewm3.assetmark.net'
    break
  case 'test':
    baseURL = 'https://test.tenant1.auth.ewm3.assetmark.net'
    break
  case 'uat':
    baseURL = 'https://p01.tenant1.auth.ewm3.assetmark.net'
    break
  case 'prod':
    baseURL = 'https://nextgen.auth.ewealthmanager.com'
    break
  default:
    baseURL = 'https://p01.tenant1.auth.ewm3.assetmark.net'
  }
  return baseURL
}

function ingestionLoginURL() {
  let baseURL
  switch (TARGET_ENV){
  case 'dev':
    baseURL = 'https://login.microsoftonline.com/ff93c4a0-f87d-46ad-b4be-3ee05cefec6b/oauth2/v2.0/token'
    break
  case 'test':
    baseURL = 'https://login.microsoftonline.com/ff93c4a0-f87d-46ad-b4be-3ee05cefec6b/oauth2/v2.0/token'
    break
  default:
    baseURL = 'https://login.microsoftonline.com/ff93c4a0-f87d-46ad-b4be-3ee05cefec6b/oauth2/v2.0/token'
  }
  return baseURL
}

export function ingestionCredentials() {
  let cred
  switch (TARGET_ENV){
  case 'dev':
    cred = {
      grant_type: 'client_credentials',
      client_id: '4b9eb279-8212-4133-a08f-4a4cf3300706',
      client_secret: __ENV.INGESTION_SECRET,
      scope: 'api://dev.nextgen.ewm3.assetmark.net/ingestion/.default'
    }
    break
  case 'test':
    cred = {
      grant_type: 'client_credentials',
      client_id: '12181f4b-4f91-4a68-b101-d82755a89997',
      client_secret: __ENV.INGESTION_SECRET,
      scope: 'api://11fe25cd-436c-4753-a875-20948edf145a/.default'
    }
    break
  default:
    cred = {
      grant_type: 'client_credentials',
      client_id: '12181f4b-4f91-4a68-b101-d82755a89997',
      client_secret: __ENV.INGESTION_SECRET,
      scope: 'api://11fe25cd-436c-4753-a875-20948edf145a/.default'
    }
  }
  return cred
}

function baseCmsURL() {
  let baseURL
  switch (TARGET_ENV){
  case 'dev':
    baseURL = 'https://dev.tenant1.cms.ewm3.assetmark.net'
    break
  case 'test':
    baseURL = 'https://test.tenant1.cms.ewm3.assetmark.net'
    break
  case 'uat':
    baseURL = 'https://p01.tenant1.cms.ewm3.assetmark.net'
    break
  default:
    baseURL = 'https://p01.tenant1.cms.ewm3.assetmark.net'
  }
  return baseURL
}

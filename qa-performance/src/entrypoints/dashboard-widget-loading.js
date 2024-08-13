import {CREDENTIALS, ITERATION_DELAY} from '../constants'
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {getAuthData} from '../utils/auth'
import {prepareDashboards} from '../utils/dashboard'
import {loadDashboardWidgetsScenario} from '../scenarios/load-dashboard'
import {apiDashboardRequests} from '../scenarios/api-dashboard-requests'
import {sleep} from 'k6'
import {browser} from 'k6/experimental/browser'
import {EWM} from '../ui/ewm'

export async function uiTest() {
  const context = browser.newContext({
    ignoreHTTPSErrors: true
  })
  const page = context.newPage()
  const credentials = randomItem(CREDENTIALS)
  const authData = await getAuthData(credentials.username, credentials.password)
  await prepareDashboards(authData.access_token)
  try {
    const ewm = new EWM(page)
    await ewm.keycloakLoginPage.makeLogin(credentials.username, credentials.password)
    await loadDashboardWidgetsScenario(page)
  } finally{
    page.close()
    context.close()
  }

  sleep( ITERATION_DELAY )
}

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  await apiDashboardRequests(await getAuthData(cred.username, cred.password))
  sleep( ITERATION_DELAY )
}
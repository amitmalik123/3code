import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {CREDENTIALS, ITERATION_DELAY, TEST_DATA_CASE} from '../constants'
import {getAuthData} from '../utils/auth'
import { sleep } from 'k6'
import {apiBicRequests} from '../scenarios/api-bic-requests'
import {EWM} from '../ui/ewm'
import {prepareDashboards} from '../utils/dashboard'
import {WIDGETS} from '../constants'
import {browser} from 'k6/experimental/browser'
import { BicUiMetrics } from '../scenarios/ui-bic-metrics'

export async function uiTest() {
  const context = browser.newContext({
    ignoreHTTPSErrors: true
  })
  const page = context.newPage()
  const credentials = randomItem(CREDENTIALS)
  const authData = await getAuthData(credentials.username, credentials.password)
  await prepareDashboards(authData.access_token, {widgets: [WIDGETS.investments], height: 4, width: 3})
  try {
    const ewm = new EWM(page)
    await ewm.keycloakLoginPage.makeLogin(credentials.username, credentials.password)
    await ewm.dashboardPage.waitPageIsReady()
    await ewm.dashboardPage.privacyPopup.checkPopupAndClose()
    await ewm.dashboardPage.widgetPendingStub(WIDGETS.investments.title).waitFor({ state: 'detached' })
    const bic = new BicUiMetrics(page)
    await bic.openBic()
  } finally{
    page.close()
    context.close()
  }

  sleep( ITERATION_DELAY )
}

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  await apiBicRequests(await getAuthData(cred.username, cred.password))
  sleep( ITERATION_DELAY )
}
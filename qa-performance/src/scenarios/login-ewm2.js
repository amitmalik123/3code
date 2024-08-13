import {Counter, Trend} from 'k6/metrics'
import {EWM} from '../ui/ewm'
import {loadDashboard} from './load-dashboard'
import {browser} from 'k6/experimental/browser'

const sl1LoginTime = new Trend('SL_1_login_time', true)

const sl1StartCounter = new Counter('SL_1_Start')
const sl2LoginCounter = new Counter('SL_2_Login')
const sl321TotalTestTime = new Trend('SL_321_total_test_time', true)

/**
 * @param {{username:string, password:string}} credentials - user credentials for login in ewm2.0
 */
export async function loginEwm2Scenario(credentials) {
  const context = browser.newContext({
    ignoreHTTPSErrors: true
  })
  const page = context.newPage()
  try {

    const ewm = new EWM(page)
    await ewm.loginPage.goto()
    await ewm.loginPage.waitPageIsReady()
    sl1StartCounter.add(1)
    await ewm.loginPage.makeLogin(credentials.username, credentials.password)
    const start = new Date()
    await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    const endOfLoginTime = new Date()
    sl2LoginCounter.add(1)
    sl1LoginTime.add(endOfLoginTime - start)

    await loadDashboard(page, start)

    sl321TotalTestTime.add(new Date() - start)
  } finally{
    page.close()
    context.close()
  }
}

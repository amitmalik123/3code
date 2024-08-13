import {Counter, Trend} from 'k6/metrics'
import {EWM} from '../ui/ewm'
import { WIDGETS} from '../constants'

const sl321TotalTestTime = new Trend('SL_321_total_test_time', true)

/**
 * @param {import ('k6/experimental/browser').Page} page
 */
export async function loadDashboardWidgetsScenario(page) {

  const start = new Date()
  await loadDashboard(page, start)
  await loadDashboardWidgets(page, start)

  sl321TotalTestTime.add(new Date() - start)

}

const sl2DashboardInitializationTime = new Trend('SL_2_dashboard_initialization_time', true)
const sl21LoginAndDashboardInitializationTime = new Trend('SL_21_login_and_initialization_time', true)
const sl3DashboardLoadingTime = new Trend('SL_3_dashboard_loading_time', true)
const sl32DashboardReadyTime = new Trend('SL_32_dashboard_ready_time', true)

const sl3InitializedCounter = new Counter('SL_3_Initialized')
const sl4LoadedCounter = new Counter('SL_4_Loaded')

/**
 * @param {import ('k6/experimental/browser').Page} page - playwright page
 * @param {Date} testStartTime - start of the test time
 */
export async function loadDashboard(page, testStartTime){
  const functionStartTime = new Date()

  const ewm = new EWM(page)
  page.waitForLoadState()
  page.waitForSelector(ewm.dashboardPage.homeButtonXpath, {state: 'attached'})
  sl3InitializedCounter.add(1)
  const endOfDashboardInitTime = new Date()
  sl2DashboardInitializationTime.add(endOfDashboardInitTime - functionStartTime)
  sl21LoginAndDashboardInitializationTime.add(endOfDashboardInitTime - testStartTime)

  await ewm.dashboardPage.waitPageIsReady()
  sl4LoadedCounter.add(1)
  const endOfDashboardLoadTime = new Date()
  sl3DashboardLoadingTime.add(endOfDashboardLoadTime - endOfDashboardInitTime)
  sl32DashboardReadyTime.add(endOfDashboardLoadTime - functionStartTime)
}

/**
 * @param {import ('k6/experimental/browser').Page} page - playwright page
 * @param {Date} testStartTime - start of the test time
 */
export async function loadDashboardWidgets(page, testStartTime){
  const functionStartTime = new Date()
  const ewm = new EWM(page)
  ewm.dashboardPage.firstWidgetLocator.waitFor({ state: 'attached' })
  // Waiting for every widget to load
  // Create an array of promises
  const widgetPromises = Object.values(WIDGETS).map(async (widget) => {
    try{
      if (page.waitForSelector(ewm.dashboardPage.widgetLocatorXpath(widget.title), {state: 'attached' , timeout:100})){
        widget.counter.add(1)
        // Waiting until widget pending stub element will be detached from the page
        ewm.dashboardPage.widgetPendingStub(widget.title).waitFor({ state: 'detached' })
        widget.trend.add(new Date() - functionStartTime)
        widget.readyCounter.add(1)
      }
    } catch (error){}
  })
  // Execute all promises concurrently
  await Promise.all(widgetPromises)
}
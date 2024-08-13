import {Counter, Trend} from 'k6/metrics'
import {EWM} from '../ui/ewm'

// BIC trend metrics
const bicOpenModalTrend = new Trend('Bic_open_modal_trend', true)
const bicModalIsReadyTrend = new Trend('Bic_modal_is_ready_trend', true)
// BIC actions counters
const bicOpenModalCounter = new Counter('Bic_open_modal_counter')
const bicModalIsReadyCounter = new Counter('Bic_modal_is_ready_counter')
export class BicUiMetrics{
  /**
     * @param {import ('k6/experimental/browser').Page} page
     */
  constructor(page){
    this.page = page
    this.ewm = new EWM(page)
    this.itertationStart = new Date()
  }

  async openBic() {
    const start = new Date()
    await this.ewm.dashboardPage.openBic()
    await this.ewm.bicPage.waitPageIsReady()
    const modalOpened = new Date()
    bicOpenModalTrend.add(modalOpened - start)
    bicOpenModalCounter.add(1)
    await this.ewm.bicPage.destinationInvestmentWidget.waitWidgetIsReady()
    bicModalIsReadyTrend.add(new Date() - modalOpened)
    bicModalIsReadyCounter.add(1)
  }

  async selectDestinationInvestment() {
    const start = new Date()

  }

}


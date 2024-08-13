import {BasePage} from './base-page'
import {BASE_URL} from '../../constants'
import { DestinationInvestmentWidget } from './../elements/bic/destination-investment'

export class BicPage extends BasePage{
    
  /**
   * @param {import ('k6/experimental/browser').Page} page
   */

  constructor(page) {
    super(page, BASE_URL + '/dashboard/bic')
    this.bicContainerXpath = '//div[contains(@class, "BicModal-module__dialogBox")]'
    this.bicContainer = this.page.locator(this.bicContainerXpath)
    this.destinationInvestmentWidget = new DestinationInvestmentWidget(page, this.bicContainerXpath)
  }

  async waitPageIsReady(){
    await this.page.waitForSelector(this.bicContainerXpath, {state: 'visible'})
  }
    
}
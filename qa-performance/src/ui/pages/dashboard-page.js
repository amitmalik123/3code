import {BasePage} from './base-page'
import {BASE_URL, WIDGETS} from '../../constants'
import { PrivacyPopup } from './../elements/privacy-popup'

export class DashboardPage extends BasePage{
    
  /**
   * @param {import ('k6/experimental/browser').Page} page
   */

  constructor(page) {
    super(page, BASE_URL + '/dashboard')
    this.manageTilesButton = this.page.locator('[data-testid="button-actions-edit"]')
    this.manageTilesButtonXpath = '[data-testid="button-actions-edit"]'
    this.homeButtonXpath = '//*[@id="navigation-fragment"]//*[contains(@title, "Home")]'
    this.dashboardSkeletonXpath = '(//div[@data-testid="app-container"]//*[contains(@class, "skeleton")])[last()]'
    this.firstWidgetLocator = this.page.locator('(//h3/ancestor::div[contains(@class, "Tile-module__tile")])[1]') 
    this.privacyPopup = new PrivacyPopup(page)
  }

  widgetLocator(widgetTitle) {
    return this.page.locator(this.widgetLocatorXpath(widgetTitle))
  }

  widgetLocatorXpath(widgetTitle) {
    return `//h3[.="${widgetTitle}"]/ancestor::div[contains(@class, "Tile-module__tile")]`
  }

  widgetPendingStub(widgetTitle) {
    return this.page.locator(`//h3[.="${widgetTitle}"]/ancestor::div[contains(@class, "Tile-module__tile")]//div[contains(@class, "empty")]/*[.="Loading..."]`)
  }

  async waitPageIsReady() {
    await this.page.waitForSelector(this.manageTilesButtonXpath, {state: 'attached'})
  }

  async openBic() {
    const strategyActionButton = this.page.locator(`(${this.widgetLocatorXpath(WIDGETS.investments.title)}//button[@title="Strategy Actions"])[1]`) 
    const openBicButton = this.page.locator('//div[contains(@class, "base--open")]//a[.="Initiate Strategy Change"]')
  
    await strategyActionButton.click()
    await openBicButton.click()
  }
}
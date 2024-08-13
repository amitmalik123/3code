export class DestinationInvestmentWidget{

  constructor(page, baseContainerXpath) { 
    this.page = page
    this.cancelButton = this.page.locator(baseContainerXpath + '//button[.="Cancel"]')
    this.xButton = this.page.locator(baseContainerXpath + '//div[contains(@class, "closeButtonCol")]/button')
    this.header = this.page.locator(baseContainerXpath + '//div[contains(@class, "ProductSelectionHeader-module__container")]')
    this.title = this.page.locator(baseContainerXpath + '//div[contains(@class, "Dialog-module__titleCol")]')
    this.nextButton = this.page.locator(baseContainerXpath + '//button[contains(text(), "Next")]') 
    this.emptyStateContent = this.page.locator(baseContainerXpath + ('//div[contains(@class, "ErrorState-module__content")]'))
    this.loader = this.page.locator('//div[@data-testid="circular-loader"]')
  }

  async waitWidgetIsReady(){
    await this.loader.waitFor({state: 'detached'})
  }
    
}
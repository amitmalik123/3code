export class PrivacyPopup{
    
  /**
     * @param {import ('k6/experimental/browser').Page} page
     */
  constructor(page) {
    this.privacyAndPreferencesPopup = page.locator('//div[@id="onetrust-pc-sdk"]')
    this.savePreferencesButton = page.locator('//div[@id="onetrust-pc-sdk"]//button[contains(@class, "save-preference-btn-handler")]')
  }
    
  async checkPopupAndClose() {
    if (await this.privacyAndPreferencesPopup.isVisible()) {
      await this.savePreferencesButton.click()
      await this.privacyAndPreferencesPopup.waitFor({state: 'hidden'})
    }
  }
}
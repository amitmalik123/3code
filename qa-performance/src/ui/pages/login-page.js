import {BasePage} from './base-page'
import {LOGIN_PAGE_URL} from '../../constants'

export class LoginPage extends BasePage{

  /**
   * @param {import ('k6/experimental/browser').Page} page
   */
  constructor(page) {
    super(page, LOGIN_PAGE_URL)
    this.popupConfirmButton = this.page.locator('//div[@id="onetrust-pc-sdk"]//button[contains(@class, "save-preference-btn-handler")]')
    this.usernameInput = this.page.locator('//input[@name="username"]')
    this.passwordInput = this.page.locator('//input[@name="password"]')
    this.submitButton = this.page.locator('//input[@type="submit"]')
  }

  async waitPageIsReady() {
    await this.page.waitForSelector('//input[@name="username"]', {state: 'attached'})
    //await this.usernameInput.waitFor({state: 'attached', timeout: TIMEOUT});
    if(await this.popupConfirmButton.isVisible() === true){
      this.popupConfirmButton.click()
    }
  }

  async makeLogin(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

}
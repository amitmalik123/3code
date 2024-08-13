import {BasePage} from './base-page'
import {BASE_URL} from '../../constants'

export class KeycloakLoginPage extends BasePage{

  /**
   * @param {import ('k6/experimental/browser').Page} page
   */
  constructor(page) {
    super(page, BASE_URL)
    this.usernameInput = this.page.locator('#username')
    this.passwordInput = this.page.locator('#password')
    this.submitButton = this.page.locator('#kc-login')
  }

  waitPageIsReady() {
    this.page.waitForSelector('#username', {state: 'attached'})
  }

  async makeLogin(username, password) {
    await this.goto()
    this.waitPageIsReady()
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }

}
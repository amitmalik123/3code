import {LoginPage} from './pages/login-page'
import {KeycloakLoginPage} from './pages/keycloak-login-page'
import {DashboardPage} from './pages/dashboard-page'
import { BicPage } from './pages/bic-page'

export class EWM {

  /**
     * @param {import ('k6/experimental/browser').Page} page
     */
  constructor(page) {
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.keycloakLoginPage = new KeycloakLoginPage(this.page)
    this.dashboardPage = new DashboardPage(this.page)
    this.bicPage = new BicPage(this.page)
  }

}
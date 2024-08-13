// @ts-ignore
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {
  generateCreateGoalRequestBody,
  generateUpdateGoalRequestBody,
  getEligibleAccountsForGoals
} from '../payloads/goals'
import {generateCsAccountsPreferences, generateCsHouseHoldPreferences} from '../payloads/cs-preferences'
import { BaseApiRequests } from '../utils/ base-api-requests'

// Client section http requests class. Made to simulate real user behavior via API
export class ClientSectionHttpRequests extends BaseApiRequests{
  /**
   * @param {import('../utils/auth').AuthResponse}authData - context for API session. Contains API login response body
   */
  constructor(authData) {
    super(authData)
    // Side requests array
    this.cmsRecourcesRequestsArray = [
      '/monitoring/api/v1/cms/resources/clients',
      '/monitoring/api/v1/cms/resources/site_modals',
      '/monitoring/api/v1/cms/resources/ewm_metadata',
      '/monitoring/api/v1/cms/resources/clients%2Fhousehold%2Fgoals',
      '/monitoring/api/v1/cms/resources/site_status_list%2Fgoal-status',
    ]
    this.advisorInfoRequestsArray = [
      '/advisormetrics/api/v2/metrics/advisors',
      '/accountdata/api/v1/advisormetrics'
    ]
    this.cmsEwmMetadataRequestsArray = [
      '/monitoring/api/v1/cms/ewm-metadata/metadata',
      '/advisormetrics/api/v2/cms/ewm-metadata/menu_items/advisor-workstation',
      '/monitoring/api/v1/cms/ewm-metadata/menu_items/advisor-profile',
      '/monitoring/api/v1/cms/ewm-metadata/menu_items/main',
    ]
  }

  /**
   * Make http requests that mimic user behavior:
   * - Open household page
   * - Choose the client
   * - Use client's dashboards
   * - Use client's goals
   * */
  async openHouseholdPage() {
    await this._executeSideRequests()

    // Household preferences
    const getPreferences = [
      '/monitoring/api/v2/preferences?uid=clients.households.table',
      '/monitoring/api/v2/preferences?uid=clients.households.toolbar',
    ]
    getPreferences.forEach(endpoint => this._http.get(endpoint))
    // Update user's preferences with random value
    this._http.put('/monitoring/api/v2/preferences', generateCsHouseHoldPreferences())

    const clientResponse = this._httpWithRespBody.post('/accountdata/api/v1/clients')
    if (clientResponse.status === 200) {
      const responseBody = await clientResponse.json()
      const clientId = randomItem(responseBody.data.data).id
      this._http.get(`/accountdata/api/v1/clients/metrics/${clientId}`, undefined, {tags:
          {
            title: `GET client's metrics`,
            related_url: `/accountdata/api/v1/clients/metrics/{clientId}`
          }})
      const sideRequests = [
        '/monitoring/api/v2/preferences?uid=clients.households.household.toolbar',
        '/monitoring/api/v1/cms/resources/clients%2Fhousehold',
      ]
      sideRequests.forEach(endpoint =>  this._http.get(endpoint))

      await this.useDashboard('clients.portfolio')
      await this.useDashboard('clients.household-information')
      await this.useGoals(clientId)
    }

  }

  /**
   * Make http requests that mimic user behavior:
   * - Open accounts page
   * - Choose the account
   * - Use account's dashboards
   * */
  async openAccountsPage() {
    await this._executeSideRequests()

    // Accounts preferences
    const getPreferences = [
      '/monitoring/api/v2/preferences?uid=clients.accounts.table',
      '/monitoring/api/v2/preferences?uid=clients.accounts.toolbar'
    ]
    getPreferences.forEach(endpoint => this._http.get(endpoint))
    // Update user's preferences with random value
    this._http.put('/monitoring/api/v2/preferences', generateCsAccountsPreferences())

    const accountResponse = this._httpWithRespBody.post('/accountdata/api/v1/accounts')
    if (accountResponse.status === 200) {
      const responseBody = await accountResponse.json()
      const accountId = randomItem(responseBody.data.data).id
      this._http.get(`/accountdata/api/v1/accounts/metrics/${accountId}`, undefined, {tags:
          {
            title: `GET account's metrics`,
            related_url: `/accountdata/api/v1/accounts/metrics/{accountId}`
          }})

      const sideRequests = [
        '/monitoring/api/v2/preferences?uid=clients.accounts.account.toolbar',
        '/monitoring/api/v1/cms/resources/clients%2Faccount',
      ]
      sideRequests.forEach(endpoint =>  this._http.get(endpoint))

      // Probably current FE uses wrong storage names. But as of now Dashboard feature is partially implemented
      await this.useDashboard('clients.portfolio')
      await this.useDashboard('clients.household-information')

    }

  }

  /**
   * Execute all side requests:
   * - CMS resources
   * - CMS ewm metadata
   * - Advisor info
   *
   * They are not connected to CS API(accountdata/goals/monitoringV2),
   * but they are executed every time when page is opened
   * */
  async _executeSideRequests(){
    this.cmsRecourcesRequestsArray.forEach(endpoint => this._http.get(endpoint))
    this.cmsEwmMetadataRequestsArray.forEach(endpoint => this._http.get(endpoint))
    this.advisorInfoRequestsArray.forEach(endpoint => this._http.get(endpoint))
  }

  /**
   * Use dashboard feature:
   * - Get household/account dashboard
   * - Update household/account dashboard (not implemented) TODO: update that part after FE will implement it
   * @param { 'clients.portfolio' | 'clients.household-information'} storageName - Dashboard storage type. Update this type after FE will implement dashboard feature
   */
  async useDashboard(storageName){
    // Get dashboard info
    const dashboardStorages = this._httpWithRespBody.get(`/monitoring/api/v2/dashboards/storages?storageName=${storageName}`)
    if (dashboardStorages.status === 200) {
      /**
       * @type {import('../payloads/goals').DashboardStoragesResponseBody}
       */
      const responseBody = await dashboardStorages.json()
      const dashboardId = responseBody.data.dashboards.find(item => item.dashboardStorageId === storageName).id
      if (dashboardId) this._http.get(`/monitoring/api/v2/dashboards?dashboardId=${dashboardId}`, undefined, {tags:
          {
            title: `GET dashboard`,
            related_url: `/monitoring/api/v2/dashboards?dashboardId={dashboardId}`
          }})
    }
  }

  /**
   * Use goals feature:
   * - GET goals list
   * - GET goal
   * - POST goal forecast
   * - POST goal
   * - PUT (update) goal
   * - DELETE goal
   * @param { string } clientId - Client(household) ID
   */
  async useGoals(clientId) {
    // Start of the Goals flow. Get client's goal list
    const getGoalsResponse = this._httpWithRespBody.get(`/goals/api/v1/goals/client/${clientId}`, undefined, {tags:
        {
          title: `GET client's goals`,
          related_url: `/goals/api/v1/goals/client/{clientId}`
        }})
    // IF get goals response is successful THEN the flow continues
    if (getGoalsResponse.status === 200) {
      /**
       * @type {import('../payloads/goals').ClientGoalResponseBody}
       */
      const getGoalsResponseBody = await getGoalsResponse.json()
      const eligibleAccounts = getEligibleAccountsForGoals(getGoalsResponseBody)
      // Goal request body
      const createGoalBody = generateCreateGoalRequestBody(clientId, eligibleAccounts)
      // IF client has at least 1 eligible account that is not in goals list yet THEN the flow continues. User creates a new goal
      if (eligibleAccounts.length > 0) {
        // Get goal forecast
        this._http.post('/goals/api/v1/goals/forecast', { planDetails: createGoalBody.planDetails })
        // Create new goal
        this._http.post('/goals/api/v1/goals', createGoalBody)
      }

      // If client has eligible accounts or already created goals THEN the flow continues.
      if (eligibleAccounts.length > 0 || getGoalsResponseBody.data.goals.length > 0) {
        // Get current goals again to get actual goals list
        const getGoalsResponse = this._httpWithRespBody.get(`/goals/api/v1/goals/client/${clientId}`, undefined, {tags:
            {
              title: `GET client's goals`,
              related_url: `/goals/api/v1/goals/client/{clientId}`
            }})
        // IF we get success goals response THEN the flow continues
        if (getGoalsResponse.status === 200) {
          /**
           * @type {import('../payloads/goals').ClientGoalResponseBody}
           */
          const getGoalsResponseBody = await getGoalsResponse.json()
          // If there are at least 1 existing goal THEN the flow continues
          if (getGoalsResponseBody.data.goals.length > 0) {
            // Get every goal performance
            getGoalsResponseBody.data.goals.forEach(goal =>  this._http.get(`/goals/api/v1/goals/performance/${goal.id}`, undefined, {tags:
                {
                  title: `GET goal's performance`,
                  related_url: `/goals/api/v1/goals/performance/{goalId}`
                }}))
            /**
             * Created before goal OR random (in case if goal was not created before)
             * @type {import('../payloads/goals').Goal}
             */
            const goal = getGoalsResponseBody.data.goals.find(goal => goal.name === createGoalBody.title)  || randomItem(getGoalsResponseBody.data.goals)
            // IF created test goal was found in the goals list THEN the flow continues
            if (goal) {
              // As of now FE did not implement update goal feature.
              // TODO: update the flow after FE will implement update goal feature to be more accurate
              const updatedGoalBody = generateUpdateGoalRequestBody(goal)
              // Get goal forecast
              this._http.post('/goals/api/v1/goals/forecast', { planDetails: updatedGoalBody.planDetails })
              // Update goal
              this._http.put(`/goals/api/v1/goals/${goal.id}`, updatedGoalBody, {tags:
                  {
                    title: `PUT goal`,
                    related_url: `/goals/api/v1/goals/{goalId}`
                  }})
              // Delete goal
              this._http.delete(`/goals/api/v1/goals/${goal.id}`, undefined, {tags:
                  {
                    title: `DELETE goal`,
                    related_url: `/goals/api/v1/goals/{goalId}`
                  }})
            }

          }

        }

      }
    }
  }

}
import {BASE_URL} from '../constants'
import {refreshAuthData} from '../utils/auth'
import {HttpClient} from '../utils/http-client'

const apiEndpointArray = [
  '/monitoring/api/v1/cms/ewm-metadata/metadata',
  '/advisormetrics/api/v2/cms/ewm-metadata/menu_items/advisor-workstation',
  '/monitoring/api/v1/cms/ewm-metadata/menu_items/advisor-profile',
  '/monitoring/api/v1/cms/ewm-metadata/menu_items/main',
  '/monitoring/api/v1/dashboard/byuser',
  '/advisormetrics/api/v2/metrics/advisors',
  '/monitoring/api/v1/cms/ewm-metadata/widgets',
  '/monitoring/api/v1/cms/ewm-metadata/side_bar',
  '/monitoring/api/v1/cms/resources/sitealerts',
  '/monitoring/api/v1/cms/resources/ewm_marketing',
  '/advisormetrics/api/v2/metrics/advisorbenefits',
  '/advisormetrics/api/v2/metrics/clients',
  '/advisormetrics/api/v2/metrics/clients/flagged',
  '/advisormetrics/api/v2/metrics/accounts',
  '/advisormetrics/api/v2/metrics/aum/mtd',
  '/advisormetrics/api/v2/metrics/aum/qtd',
  '/advisormetrics/api/v2/metrics/aum/ytd',
  '/advisormetrics/api/v2/metrics/revenue',
  '/advisormetrics/api/v2/metrics/netflow/mtd',
  '/advisormetrics/api/v2/metrics/netflow/qtd',
  '/advisormetrics/api/v2/metrics/netflow/ytd',
  '/advisormetrics/api/v2/workitem/needattention',
  '/advisormetrics/api/v2/workitem/open',
  '/advisormetrics/api/v2/workitem/completed',
  '/advisormetrics/api/v2/workitem/following',
  '/advisormetrics/api/v2/metrics/investments/strategy',
  '/advisormetrics/api/v2/metrics/investments/approach'
]

/** 
 * @param authData - context for API session. Contains API login response body
 */
export async function apiDashboardRequests(authData) {
  // refresh access token in case when access token is close to be expired (60 seconds before expiration)
  if (Date.now() - authData.generationTime > (authData.expires_in - 60) * 1000) {
    // modifying original authData object (that is outside current function)
    Object.assign(authData, (await refreshAuthData(authData.refresh_token)))
  }

  const session = new HttpClient({
    baseURL: BASE_URL,
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${authData.access_token}`
    }
  })

  apiEndpointArray.forEach(endpoint => {
    session.get(endpoint)
  })
}
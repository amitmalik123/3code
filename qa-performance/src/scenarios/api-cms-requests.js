import {BASE_URL_CMS, CMS_TOKEN} from '../constants'
import {HttpClient} from '../utils/http-client'

const apiEndpointArray = [
  '/api/ewm_widgets',
  '/api/ewm_widget/90dc4fd7-1101-4f44-921d-4fc5572c1417',
  '/api/menu_items/main',
  '/api/menu_items/advisor-profile',
  '/api/menu_items/advisor-workstation',
  '/api/ewm_metadata',
  '/api/ewm_manage_label',
  '/api/ewm_marketing',
  '/api/v1/ewm/sitealerts'
]

export async function apiCmsRequests(auth = true) {
  const headers = {
    'content-type': 'application/json'
  }
  if (auth) headers.authorization = `Basic ${CMS_TOKEN}`
  const session = new HttpClient({
    baseURL: BASE_URL_CMS, headers
  })

  apiEndpointArray.forEach(endpoint => {
    session.get(endpoint)
  })
}
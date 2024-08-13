import {BASE_URL} from '../constants'
import {HttpClient} from '../utils/http-client'

export class BaseApiRequests{
  /**
   * @param {import('./auth').AuthResponse}authData - context for API session. Contains API login response body
   */
  constructor(authData) {
    if (this.constructor === BaseApiRequests) {
      throw new Error('Cannot instantiate abstract class BaseApiRequests')
    }
    // Initialize http clients
    // Regular client (without response body)
    this._http = new HttpClient({
      baseURL: BASE_URL,
      headers: {
        'content-type': 'application/json', 'authorization': `Bearer ${authData.access_token}`
      }
    })
    // Client with ability to get response body
    this._httpWithRespBody = new HttpClient({
      baseURL: BASE_URL,
      headers: {
        'content-type': 'application/json', 'authorization': `Bearer ${authData.access_token}`
      },
      responseType: 'text'
    })
    /**
     * Side http requests array that will be executed in scope of method `_executeSideRequests()`
     * 
     * @type import('../utils/http-client').HttpRequest[]
     */
    this._sideRequestsArray = []
  }

  /**
   * Execute all side requests.
   * For example get CMS data OR make http request that is not connected to current app
   * */
  _executeSideRequests(){
    this._sideRequestsArray.forEach(endpoint => this._http.request(
      endpoint.method,
      endpoint.url,
      endpoint.body,
      endpoint.params
    ))
  }

}
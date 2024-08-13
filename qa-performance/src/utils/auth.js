import http from 'k6/http'
import encoding from 'k6/encoding'
// @ts-ignore
import urlencode from 'https://jslib.k6.io/form-urlencoded/3.0.0/index.js'
import {BASE_URL, INGESTION_LOGIN_URL, KEYCLOAK_URL} from '../constants'

/**
 * @typedef {Object} AuthResponse - context for API session. Contains API login response body
 * @property {string} access_token - The access token string.
 * @property {number} expires_in - The number of seconds until the access token expires.
 * @property {number} refresh_expires_in - The number of seconds until the refresh token expires.
 * @property {string} refresh_token - The refresh token string.
 * @property {string} token_type - The type of the token, typically "Bearer".
 * @property {string} id_token - The ID token string.
 * @property {number} not-before-policy - The timestamp before which the token is not valid.
 * @property {string} session_state - The session state identifier.
 * @property {string} scope - The scope of the token.
 */

const params = {
  tags: {title: 'GET /realms/eWM/protocol/openid-connect/token'},
  responseType: 'text'
}
/**
 * Make the http request using username and password to get user token 
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<AuthResponse>} Auth response body. Containing token and etc.
 */
export async function getAuthData(username, password) {
  
  const result = await http.asyncRequest('POST', `${KEYCLOAK_URL}/realms/eWM/protocol/openid-connect/token`, {
    username, password, grant_type: 'password', client_id: 'eWMAuth', scope: 'openid profile'
  }, params).then(res => res.json())

  result.generationTime = Date.now()
  console.log("result "+result);
  console.log("result with generation time "+result.generationTime);
  result.profile = JSON.parse(encoding.b64decode(result.id_token.split('.')[1], 'rawstd', 's'))

  return result
}

export async function refreshAuthData(refreshToken) {
  const result = await http.asyncRequest('POST', `${KEYCLOAK_URL}/realms/eWM/protocol/openid-connect/token`, {
    refresh_token: refreshToken, grant_type: 'refresh_token', client_id: 'eWMAuth', scope: 'openid profile email'
  }, params).then(res => res.json())

  result.generationTime = Date.now()
  result.profile = JSON.parse(encoding.b64decode(result.id_token.split('.')[1], 'rawstd', 's'))

  return result
}

export async function getSessionsByCredentials(credentialsList) {
  return Promise.all(credentialsList.map((config) => {
    return getAuthData(config.username, config.password)
  }))
}

export async function ingestionAuthToken(credentials) {
  const body = urlencode({
    grant_type: credentials.grant_type,
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    scope: credentials.scope,
  })
  const params = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    responseType: 'text'
  }
  const reqResponse = http.request('POST', INGESTION_LOGIN_URL, body, params)
  return JSON.parse(reqResponse.body)
}

export async function getEwmAdvisorCodes(authData){
  const params = {headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'Authorization': `Bearer ${authData.access_token}`},
  tags: {title: 'GET /advisorinsights/api/v1/agentid/agent'},
  responseType: 'text'}
  const reqResponse = http.request('GET',`${BASE_URL}/advisorinsights/api/v1/agentid/agent`,'',params)
  const respJSON =  reqResponse.json()
  const jsonResponse = JSON.parse(respJSON)
  return jsonResponse.map(obj => obj['sourceId']).join(',')
}
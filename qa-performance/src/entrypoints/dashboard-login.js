import {loginEwm2Scenario} from '../scenarios/login-ewm2'
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {CREDENTIALS, EWM_2_CREDENTIALS, ITERATION_DELAY} from '../constants'
import {getAuthData} from '../utils/auth'
import {apiDashboardRequests} from '../scenarios/api-dashboard-requests'
import {sleep} from 'k6'

export async function uiTest() {
  await loginEwm2Scenario(randomItem(EWM_2_CREDENTIALS))
  sleep( ITERATION_DELAY )
}

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  await apiDashboardRequests(await getAuthData(cred.username, cred.password))
  sleep( ITERATION_DELAY )
}
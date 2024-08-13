import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import {getAuthData} from '../utils/auth'
import {apiInsightsRequests} from '../scenarios/api-insights-requests'
import {CREDENTIALS, ITERATION_DELAY} from '../constants'
import {sleep} from 'k6'

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  await apiInsightsRequests(await getAuthData(cred.username, cred.password))
  sleep(ITERATION_DELAY)
}
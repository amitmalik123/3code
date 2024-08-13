import {randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {CREDENTIALS, ITERATION_DELAY} from '../constants'
import {getAuthData} from '../utils/auth'
import { sleep } from 'k6'
import {ClientSectionHttpRequests} from '../scenarios/api-client-section-requests'

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  const cs = new ClientSectionHttpRequests(await getAuthData(cred.username, cred.password))
  await cs.openHouseholdPage()
  await cs.openAccountsPage()
  sleep( ITERATION_DELAY )
}
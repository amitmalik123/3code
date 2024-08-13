// @ts-ignore
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {CREDENTIALS, ITERATION_DELAY} from '../constants'
import {getAuthData} from '../utils/auth'
import { sleep } from 'k6'
import { InvestorPortalRequests } from '../scenarios/api-investor-portal-requests'

export async function apiTest() {
  const cred = randomItem(CREDENTIALS)
  console.log("cred value is "+cred);
  const ip = new InvestorPortalRequests(await getAuthData(cred.username, cred.password))
  await ip.openOverviewPage()
  await ip.openPortfolioPage()
  // Following methods are not implemented yet
  // await ip.openGoalsPage()
  // await ip.openGoalsPage()
  sleep( ITERATION_DELAY )
}
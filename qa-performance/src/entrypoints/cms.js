import {apiCmsRequests} from '../scenarios/api-cms-requests'
import {sleep} from 'k6'
import {ITERATION_DELAY} from '../constants'

export async function apiTest() {
  await apiCmsRequests()
  sleep( ITERATION_DELAY )
}

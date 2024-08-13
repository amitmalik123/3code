import {INGESTION_CREDENTIALS, ITERATION_DELAY} from '../constants'
import {ingestionAuthToken} from '../utils/auth'
import {apiIngestionRequests} from '../scenarios/api-ingestion-requests'
import {sleep} from 'k6'

export async function apiTest() {
  await apiIngestionRequests(await ingestionAuthToken(INGESTION_CREDENTIALS))
  sleep( ITERATION_DELAY )
}

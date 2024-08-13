import {randomIntBetween, randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {randomBoolean, shuffleArray} from '../utils/helpers'

// Define JS types

/**
 * @typedef {Object} SortingOption
 * @property {string} id
 * @property {boolean} desc
 */

/**
 * @typedef {Object} Filter
 * @property {string} id
 * @property {Array<any>} value
 */

/**
 * @typedef {{ [key: string]: boolean }} ColumnVisibility
 */

/**
 * @typedef {Object} PreferenceParameters
 * @property {Array<Filter>} [accountInitialColumnFilters]
 * @property {Array<Filter>} [householdInitialColumnFilters]
 * @property {Array<SortingOption>} [accountColumnSorting]
 * @property {Array<SortingOption>} [householdColumnSorting]
 * @property {Array<string>} [accountColumnOrder]
 * @property {Array<string>} [householdColumnOrder]
 * @property {ColumnVisibility} [accountColumnVisibility]
 * @property {ColumnVisibility} [householdColumnVisibility]
 * @property {number} [accountInitialPageSize]
 * @property {number} [householdInitialPageSize]
 *
 */

/**
 * @typedef {Object} PreferenceRequestBody
 * @property {string} uid
 * @property {string} description
 * @property {number} schemaVersion
 * @property {PreferenceParameters} parameters
 */

/**
 * Generate CS preference
 *
 * @param { 'household' | 'account' }type
 * @param {Array<string>}columns
 * @return Array<PreferenceRequestBody>
 * */
function generatePreferences(type, columns){
  const availablePageSizes = [25, 50, 100]
  /**
   * @type PreferenceParameters
   * */
  let parameters= {}
  switch (type){
  case 'household':
    parameters = {
      householdInitialColumnFilters: [],
      householdColumnSorting: [
        {
          id: randomItem(columns),
          desc: randomBoolean()
        }
      ],
      householdColumnOrder: shuffleArray(columns),
      householdColumnVisibility: columns.reduce((obj, key) => {
        obj[key] = randomBoolean()
        return obj
      }, {}),
      householdInitialPageSize: randomItem(availablePageSizes)
    }
    break
  case 'account':
    parameters = {
      accountInitialColumnFilters: [],
      accountColumnSorting: [
        {
          id: randomItem(columns),
          desc: randomBoolean()
        }
      ],
      accountColumnOrder: shuffleArray(columns),
      accountColumnVisibility: columns.reduce((obj, key) => {
        obj[key] = randomBoolean()
        return obj
      }, {}),
      accountInitialPageSize: randomItem(availablePageSizes)
    }
    break
  }

  return [{
    uid: `clients.${type}s.table`,
    description: `Client Section Households Table`,
    schemaVersion: 1,
    parameters
  }]
}

export function generateCsHouseHoldPreferences(){
  const columns = [
    'clientName',
    'advisorIdentifier',
    'proposed',
    'numberOfAccounts',
    'marketValue',
    'netInvestments',
    'establishedDate',
    'ytdPerformance',
    'expectedAmount',
    'qtdPerformance',
    'cumulativeReturn',
    'annualizedPerformance',
    'assetAllocations',
    'webAccess',
    'oneYearPerformance',
    'threeYearPerformance',
    'fiveYearPerformance',
    'actionsEnd'
  ]
  return generatePreferences('household', columns)
}

export function generateCsAccountsPreferences(){
  const columns = [
    'accountTitle',
    'clientName',
    'registrationType',
    'accountNumber',
    'accountStatus',
    'investmentProduct',
    'approach',
    'marketValue',
    'custodian',
    'inceptionDate',
    'qtdPerformance',
    'ytdPerformance',
    'cumulativeReturn',
    'annualizedPerformance',
    'assetAllocations',
    'expectedAmount',
    'netInvestments',
    'oneYearPerformance',
    'threeYearPerformance',
    'fiveYearPerformance',
    'advisorIdentifier',
    'actionsEnd'
  ]
  return generatePreferences('account', columns)
}
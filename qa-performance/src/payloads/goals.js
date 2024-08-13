import {randomIntBetween, randomItem, uuidv4} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {countPeriodDifference, formatDateToString, getRandomArrayItems} from '../utils/helpers'

// JS types definition

/**
 * @typedef {Object} GoalPlanDetails
 * @property {string} startDate - Goal start date.
 * @property {number} startMarketValue - Start market value.
 * @property {string} targetDate - Goal target year of 1 to 50 years out (starting from current year)
 * @property {number} targetMarketValue - Goal target market value. Can't be less than startMarketValue.
 *
 * **NOTE**: targetMarketValue must be consistent with targetDate and periodicContribution.
 *
 * For example if (targetDate - startDate) / periodicity * periodicContribution > targetMarketValue - startMarketValue
 *
 * Then BE will return an error: "Forecast is incorrect: result not found in 100 steps"
 *
 * @property {number} periodicContribution - Amount of contribution in a period .
 * @property {PeriodicityTypes | string} periodicity - Periodicity. As of now FE uses only monthly periodicity
 */

/**
 * @typedef {Object} Goal
 * @property {string} id - Goal ID.
 * @property {string} name - Goal name.
 * @property {string} type - Goal type.
 * @property {string} status - Goal status.
 * @property {GoalPlanDetails} planDetails - Goal plan detail.
 * @property {number} currentMarketValue - current market value.
 * @property {number} currentExpectedMarketValue - current expected market value.
 * @property {number} totalPrincipal
 * @property {number} totalInterest
 * @property {AccountForGoal[]} accounts - Accounts array.
 */

/**
 * @typedef {Object} AccountForGoal
 * @property {string} id - Account ID.
 * @property {string} title - Account title.
 * @property {string} bankAccountNumber - Bank account number.
 * @property {number} marketValue - Market value.
 * @property {string[]} eligibleForGoalTypes - An array of eligible for goal types. If array is empty then account is ineligible
 */

/**
 * @typedef {{data: {clientId: string, goals: Goal[], accountsWithoutGoals: AccountForGoal[]}}} ClientGoalResponseBody
 */

/**
 * @typedef {{data: {id: string, dashboards: {id: string, dashboardStorageId: string, name: string, isDefault: boolean}[]}}} DashboardStoragesResponseBody
 */

/**
 * @typedef {Object} GoalRequestBody
 * @property {string | undefined} householdId - The unique identifier for the household. Required For Create request body only
 * @property {string} title - The title of the plan.
 * @property {'Retirement' | 'General'} type - The type of the plan.
 * @property {GoalPlanDetails} planDetails - The details of the plan.
 * @property {string[]} accountIds - The list of account IDs.
 */

/**
 * Enum for Periodicity types.
 * @readonly
 * @enum {string}
 */
export const PeriodicityTypes = Object.freeze({
  DAILY: 'Daily',
  MONTHLY: 'Monthly',
  QUARTERLY: 'Quarterly',
  YEARLY: 'Yearly'
})

// Some reusable functions for goals:

/**
 * Get eligible accounts array from "Get goals" response body
 *
 * @param { ClientGoalResponseBody } clientGoalResponseBody - client(household) goals response body
 * @return AccountForGoal[]
 */
export function getEligibleAccountsForGoals(clientGoalResponseBody){
  return clientGoalResponseBody.data.accountsWithoutGoals
    .filter(account => account.eligibleForGoalTypes.length > 0)
}

/**
 * Generate random valid GoalRequestBody
 *
 * @param { string } clientId - client ID
 * @param { AccountForGoal[] } eligibleAccounts - Array of client's eligible accounts. Accounts should not be used in other goals
 * Note: we are using `getRandomArrayItems` to get random account or accounts from array depending on current run TEST_DATA_CASE
 * @return GoalRequestBody
 */
export function generateCreateGoalRequestBody(clientId, eligibleAccounts){
  /**
   * @type {AccountForGoal[]}
   */
  const accounts = getRandomArrayItems(eligibleAccounts)
  const startDate = new Date()
  const startMarketValue = accounts.reduce((sum, item) => sum + item.marketValue, 0)
  const targetDate = new Date(startDate)
  // Set the year to the current year + 1-50 years
  targetDate.setFullYear(startDate.getFullYear() + randomIntBetween(1, 50))
  // As of now FE uses only MONTHLY that's why I don't randomize it to be more accurate
  const periodicity = PeriodicityTypes.MONTHLY
  const periodMultiplier = countPeriodDifference(startDate, targetDate, periodicity)
  const periodicContribution = randomIntBetween(1, 10000)
  const targetMarketValue = periodicContribution * (periodMultiplier + 1) + startMarketValue

  /**
   * @type {GoalRequestBody}
   */
  return {
    householdId: clientId,
    title: `Perf test ${uuidv4()}`,
    type: randomItem(['Retirement', 'General']),
    accountIds: accounts.map(account => account.id),
    planDetails: {
      startDate: formatDateToString(startDate),
      startMarketValue,
      targetDate: formatDateToString(targetDate),
      targetMarketValue,
      periodicity,
      periodicContribution
    }
  }
}

/**
 * Generate update goal request body using existing goal
 *
 * @param { Goal } goal - client ID
 * @return GoalRequestBody
 */
export function generateUpdateGoalRequestBody(goal){
  const startDate = new Date(goal.planDetails.startDate)
  const startMarketValue = goal.planDetails.startMarketValue
  const targetDate = new Date(startDate)
  // Set the year to the current year + 1-50 years
  targetDate.setFullYear(startDate.getFullYear() + randomIntBetween(1, 50))
  // As of now FE uses only MONTHLY that's why I don't randomize it to be more accurate
  const periodicity = PeriodicityTypes.MONTHLY
  const periodMultiplier = countPeriodDifference(startDate, targetDate, periodicity)
  const periodicContribution = randomIntBetween(1, 10000)
  const targetMarketValue = periodicContribution * (periodMultiplier + 1) + startMarketValue

  /**
   * @type {GoalRequestBody}
   */
  return {
    title: `Perf test ${uuidv4()}`,
    type: randomItem(['Retirement', 'General']),
    accountIds: goal.accounts.map(account => account.id),
    planDetails: {
      startDate: formatDateToString(startDate),
      startMarketValue,
      targetDate: formatDateToString(targetDate),
      targetMarketValue,
      periodicity,
      periodicContribution
    }
  }
}
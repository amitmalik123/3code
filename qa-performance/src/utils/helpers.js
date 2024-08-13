import {randomIntBetween, randomItem} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'
import {TEST_DATA_CASE} from '../constants'

/**
 * @param {'year' | 'month' | 'day' | 'hour' | 'min' | 'sec'} periodToShift - Date period desired to shift.
 * @param {number} amountToShift - Amount of time desired to shift. Accepts positive and negative integers
 */
export function timeShift(periodToShift, amountToShift){
  const currentDate  = new Date()
  const shiftedDate = {
    'year':()=>currentDate.setFullYear(currentDate.getFullYear() + amountToShift),
    'month':()=>currentDate.setMonth(currentDate.getMonth() + amountToShift),
    'day':()=>currentDate.setDate(currentDate.getDate() + amountToShift),
    'hour':currentDate.setHours(currentDate.getHours() + amountToShift),
    'min':()=>currentDate.setMinutes(currentDate.getMinutes() + amountToShift),
    'sec':()=>currentDate.setSeconds(currentDate.getSeconds() + amountToShift),
    '':()=>console.error('Invalid periodToShift provided.'),
  }
  return new Date(shiftedDate[periodToShift.toLowerCase()]())
}

const firstName = [
  'Abby', 'Barney', 'Cassandra', 'Derek', 'Eleanor','Freddy', 'Gertrude', 'Hans', 'Isadora', 'Jack',
  'Kimberly', 'Lenny', 'Margaret', 'Nick', 'Olivia','Peter', 'Quinn', 'Ronda', 'Steve', 'Tracy',
  'Ulrich', 'Vera', 'Wendy', 'Xavier', 'Yasmine','Zelda', 'Arnold', 'Belle', 'Charlie', 'Diane',
  'Edward', 'Felicity', 'Gerald', 'Helena', 'Ivan','Jessica', 'Ken', 'Laura', 'Martin', 'Naomi',
  'Orlando', 'Paula', 'Quentin', 'Rosa', 'Simon','Tina', 'Ursula', 'Vincent', 'Wanda', 'Xander',
  'Yolanda', 'Zane', 'Allison', 'Bob', 'Celeste','Doug', 'Eliza', 'Frank', 'Georgina', 'Harry',
  'Iris', 'John', 'Kristen', 'Leon', 'Melissa','Ned', 'Octavia', 'Paul', 'Quincy', 'Ralph',
  'Susan', 'Timothy', 'Uma', 'Victor', 'Winona','Xenia', 'Yuri', 'Zenobia', 'Albert', 'Becky',
  'Clarence', 'Delilah', 'Eric', 'Fiona', 'Gordon','Haley', 'Igor', 'Julia', 'Kurt', 'Linda',
  'Mortimer', 'Nancy', 'Oscar', 'Patty', 'Quill','Rhonda', 'Sam', 'Tiffany', 'Upton', 'Veronica',
  'Walter', 'Xena', 'Yves', 'Zachary'
]

export function getRandomName(){
  const lastName = [
    'Appleby', 'Barker', 'Crimson', 'Davison', 'Exeter','Fisher', 'Griffin', 'Hawthorne', 'Inglewood',  'Jackson',
    'Knightley', 'Labrador', 'Masterson', 'Norwood', 'Orwell','Palmer', 'Quincy', 'Rowling', 'Stonewall', 'Thatcher',
    'Underwood', 'Valentine', 'Windsor', 'Xavier', 'York','Zimmerman', 'Anderson', 'Bloom', 'Carter', 'Dixon',
    'Ellsworth', 'Fox', 'Garrison', 'Hollingsworth', 'Iverson','Jones', 'Kensington', 'Lancaster', 'Maddox', 'Nelson',
    'Overstreet', 'Parish', 'Quintin', 'Rivers', 'Salisbury','Templeton', 'Underhill', 'Vandenberg', 'Waterhouse', 'Xenos',
    'Yardley', 'Zephyr', 'Archer', 'Brooks', 'Cooper','Donovan', 'Eldridge', 'Franklin', 'Gibson', 'Huddleston',
    'Ingram', 'Johnson', 'Keats', 'Littleton', 'Modena','Newman', 'Ogden', 'Parker', 'Quist', 'Remington',
    'Sherwood', 'Talmadge', 'Updike', 'Vance', 'Whitaker','Xander', 'Young', 'Zane', 'Albright', 'Blackwood',
    'Caldwell', 'Deveraux', 'Ellis', 'Ferguson', 'Grove','Hemsworth', 'Ipswich', 'Jefferson', 'Kingsley', 'Lockhart',
    'Mills', 'Norton', 'Oglethorpe', 'Prescott', 'Rider','Ramsey', 'Sutherland', 'Truman', 'Upland', 'Vaughn',
    'Walsh', 'Xerxes', 'Yeoman', 'Zola'
  ]
  return `${randomItem(firstName)} ${randomItem(lastName)}`
}

export function getRandomCorpName(){
  const adjectives = [
    'Amazing', 'Super', 'Lazy', 'Bored', 'Joyful', 'Strategic',
    'Heavy', 'Light', 'Green', 'Red', 'Blue', 'Mechanic',
    'Invisible', 'Desert', 'Optimistic', 'Victorious', 'Futuristic',
    'New', 'Old', 'Crazy', 'Electric', 'Nice', 'North', 'South', 'East', 'West'
  ]

  const industryType =[
    'Incorporated', 'Corporation', 'Inc', 'Corp', 'Industries', 'Associates','Investments',
    'Agency', 'Bureau', 'Enterprise', 'Office', 'Institute', 'Funds', 'Advisors'
  ]
  return `${randomItem(firstName)} ${randomItem(adjectives)} ${randomItem(industryType)}`
}

export function getLastQuarterEndDate() {
  const currentDate = new Date()

  let year = currentDate.getFullYear()
  const quarter = Math.floor((currentDate.getMonth() / 3))
  let month

  switch (quarter) {
  case 0: // Current date in Q1, last completed quarter was Q4 of previous year
    month = 11 // December of the previous year
    year--
    break
  case 1: // We are in Q2, last completed quarter was Q1
    month = 2 // March
    break
  case 2: // We are in Q3, last completed quarter was Q2
    month = 5 // June
    break
  case 3: // We are in Q4, last completed quarter was Q3
    month = 8 // September
    break
  }
  const lastDayOfQuarter = new Date(year, month + 1, 0).getDate()
  return new Date(year, month, lastDayOfQuarter).toISOString().split('T')[0]
}

/**
 * Deeply merges multiple objects into a target object.
 * If a property in the target object is an object, it merges the corresponding properties in the source objects recursively.
 *
 * @param {object} target - The target object to merge into.
 * @param {...object} sources - The source objects to merge from.
 * @returns {object} The merged object.
 */
export function objectsMerge(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        objectsMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return objectsMerge(target, ...sources)
}

/**
 * Checks if an item is an object (excluding arrays).
 *
 * @param {*} item - The item to check.
 * @returns {boolean} Returns true if the item is an object (excluding arrays), false otherwise.
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Shuffles the elements of an array in place.
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} - The shuffled array.
 */
export function shuffleArray(array) {
  // Create a copy of the original array to avoid modifying the original array
  const newArray = array.slice()

  // Fisher-Yates shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

/**
 * Returns an array of random items
 * @param {[]} array - The original array.
 * @param {'min' | 'max' | 'random' | number} testDataCase - Defines how many data should be picked from original array. Default is defined in env variable TEST_DATA_CASE
 * @returns {[]} - Array of random elements from the original array.
 */
export function getRandomArrayItems(array, testDataCase= TEST_DATA_CASE){
  array = shuffleArray(array)
  let itemsCount = 0
  const max = array.length
  if (max > 0 ){
    if (typeof testDataCase === 'string'){
      switch (testDataCase){
      case 'min': itemsCount = 1
        break
      case 'max': itemsCount = max
        break
      case 'random': itemsCount = randomIntBetween(1, max)
        break
      }
    } else if (typeof testDataCase === 'number') {
      itemsCount = Math.min(max, testDataCase)
    }

  }
  const randomArrayItems = []
  for (let i = 0; i < itemsCount; i++) {
    randomArrayItems.push(array[i])
  }
  return randomArrayItems
}

/**
 * Converts a Date object to a string in the format "YYYY-MM-DD".
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export function formatDateToString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Count days difference between two days
 *
 * @param { Date } startDate - start date
 * @param { Date } endDate - end date
 * @return { number } days difference between two dates
 */
export function countDaysDifference(startDate, endDate){
  const millisecondsInDay = 1000 * 60 * 60 * 24
  const differenceInMilliseconds = endDate.getTime() - startDate.getTime()
  // Convert mills to days
  return Math.ceil(differenceInMilliseconds / millisecondsInDay)
}

/**
 * Count months difference between two days
 *
 * @param { Date } startDate - start date
 * @param { Date } endDate - end date
 * @return { number } months difference between two dates
 */
export function countMonthsDifference(startDate, endDate){
// Count of months difference between endDate and startDate
  return (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth()
}

/**
 * Count quarters difference between two days
 *
 * @param { Date } startDate - start date
 * @param { Date } endDate - end date
 * @return { number } quarters difference between two dates
 */
export function countQuartersDifference(startDate, endDate){
  const startQuarter = Math.floor(startDate.getMonth() / 3) // Quarter of the start date
  const endQuarter = Math.floor(endDate.getMonth() / 3) // Quarter of the end date
  const quartersInYear = 4 // Number of quarters in a year
  return endQuarter - startQuarter + quartersInYear * countYearsDifference(startDate, endDate)
}

/**
 * Count years difference between two days
 *
 * @param { Date } startDate - start date
 * @param { Date } endDate - end date
 * @return { number } years difference between two dates
 */
export function countYearsDifference(startDate, endDate){
  return endDate.getFullYear() - startDate.getFullYear()
}

/**
 * Count period difference between two days
 *
 * @param { Date } startDate - start date
 * @param { Date } endDate - end date
 * @param { 'Daily' | 'Monthly' | 'Quarterly' | 'Yearly' } periodicity - periodicity
 * @return { number } periods difference between two dates
 */
export function countPeriodDifference(startDate, endDate, periodicity){
  switch (periodicity){
  case 'Daily':
    return  countDaysDifference(startDate, endDate)
  case 'Monthly':
    return countMonthsDifference(startDate, endDate)
  case 'Quarterly':
    return countQuartersDifference(startDate, endDate)
  case 'Yearly':
    return countYearsDifference(startDate, endDate)
  }
}

/**
 *
 * @return {boolean}
 */
export function randomBoolean(){
  const arr = [true, false]
  return randomItem(arr)
}
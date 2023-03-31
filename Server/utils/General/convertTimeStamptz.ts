import moment from 'moment'
// 2023-03-12T17:47:47.856391+00:00

// Returns date eg. 2023-03-12
export const getDate = (date: string) => {
  const indexOfT = date.indexOf('T')
  return date.slice(0, indexOfT)
}

// Returns time eg.17:47:47
export const getTime = (date: string) => {
  const indexOfT = date.indexOf('T')
  const indexOfDot = date.indexOf('.')
  return date.slice(indexOfT + 1, indexOfDot)
}

// given an array of timestamps, return the most recent timestamp
export const mostRecentTimestamp = (arrayOfTimeStamps: string[]): string => {
  let mostRecentTimestamp = 'Initial Date'
  for (let i = 0; i < arrayOfTimeStamps.length; i++) {
    if (i === 0) {
      mostRecentTimestamp = arrayOfTimeStamps[i]
    }
    else if (new Date(arrayOfTimeStamps[i]) > new Date(mostRecentTimestamp)) {
      mostRecentTimestamp = arrayOfTimeStamps[i]
    }
  }
  return mostRecentTimestamp
}

export const compareTwoDates = (firstTimeStamp: string, secondTimeStamp: string): number => {
  if (new Date(firstTimeStamp) === new Date(secondTimeStamp)) {
    return 0
  }
  else if (new Date(firstTimeStamp) > new Date(secondTimeStamp)) {
    return 1
  }
  else {
    return -1
  }
}

export const sortArrayOfTimeStamps = (arrayOfTimeStamps: string[]): string[] => {
  const sortedArrayOfTimeStamps = arrayOfTimeStamps.sort(compareTwoDates)
  return sortedArrayOfTimeStamps
}

export function getTodaysDate () {
  return getDate(moment().format())
}

//  returns the timestamp right now in the format: 2023-03-26T14:03:41+01:00
export function getTimeStamp () {
  return moment().format()
}

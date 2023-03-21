
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

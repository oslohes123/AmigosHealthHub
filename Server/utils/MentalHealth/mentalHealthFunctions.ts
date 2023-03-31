// this function returns the words in the form of an array
export function getWords (arr: any): string[] {
  if (arr.length === 0) {
    return []
  }
  const result: string[] = []
  for (let i = 0; i < arr.length; i++) {
    // result.push(JSON.stringify(arr[i]['todays_word']))
    result.push(JSON.stringify(arr[i]['todays_word']))
  }
  return result
}
// this function returns the face values in the form of an array
export function getFaces (arr: any): string[] {
  if (arr.length === 0) {
    return []
  }
  const result: string[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(JSON.stringify(arr[i]['face_id']))
  }
  return result
}
// this function returns the date values in the form of dd/mm in an array

export function getDates (arr: any): string[] {
  if (arr.length === 0) {
    return []
  }
  const result: string[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push((arr[i]["created_at"]).slice(8,10) + "/" + (arr[i]["created_at"]).slice(5,7))
  }
  return result
}
// this function gets the average of the past 7 face values
export function average (arr: string[]): number {
  if (arr.length === 0) {
    return 0
  }
  const result: number[] = []
  for (let i = 0; i < arr.length; i++) {
    result.push(parseFloat(arr[i]))
  }
  const sum = result.reduce((acc, val) => acc + val, 0)
  const average = sum / arr.length
  return average
}// get frequency of a word in a list
export function getOccurrences (arr: string[], v: string): number {
  let count = 0
  arr.forEach((elem) => (elem === v && count++))
  return count
}
// make a list of a frequencies of the words in the array in the parameter
export function wordFreq (arr: string[]): string[] {
  const newarr: string[] = []
  const nodupes: string[] = []
  for (const elem of arr) {
    if (!nodupes.includes(elem)) {
      nodupes.push(elem)
    }
  }
  for (const item of nodupes) {
    newarr.push(getOccurrences(arr, item).toString())
  }
  return newarr
}

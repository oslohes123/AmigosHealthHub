export function removeDuplicates (arr: any[]) {
  return [...new Set(arr)]
}

export function countElementsInArray (arr: any[]) {
  // eslint-disable-next-line no-return-assign, no-sequences
  return arr.reduce((acc: any, curr: any) => (acc[curr] = (Number((acc[curr] || 0)) + Number(1)), acc), {})
}

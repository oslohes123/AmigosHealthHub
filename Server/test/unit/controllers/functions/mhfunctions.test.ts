import { getToday } from '../../../../routes/MentalHealth/rateMental.controller'
import { average, getFaces, getOccurrences, getWords, wordFreq } from '../../../../utils/mhfunctions'
const test = require('ava')

test('getToday returns a string in the format YYYY-MM-DD', (t: any) => {
  const today: string = getToday()
  const regex: RegExp = /^\d{4}-\d{2}-\d{2}$/
  t.true(regex.test(today))
})

test('getToday returns the current date', (t: any) => {
  const today: string = getToday()
  const date: Date = new Date()
  const year: string = date.getFullYear().toString()
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0')
  const day: string = date.getDate().toString().padStart(2, '0')
  t.is(today, `${year}-${month}-${day}`)
})

interface Obj {
  [word: string]: any
}
test('average should return the correct value for an array of numbers', (t: any) => {
  const arr: string[] = ['1', '2', '3', '4', '5']
  const expected: number = 3
  const actual: number = average(arr)
  t.is(actual, expected)
})

test('average should return 0 for an empty array', (t: any) => {
  const arr: string[] = []
  const expected: number = 0
  const actual: number = average(arr)
  t.is(actual, expected)
})

test('average should be able to deal with duplicate numbers', (t: any) => {
  const arr: string[] = ['1', '2', '3', '1', '5', '5', '4']
  const expected: number = 3
  const actual: number = average(arr)
  t.is(actual, expected)
})

test('average should be able to deal with decimal numbers', (t: any) => {
  const arr: string[] = ['1.5', '2.5', '3.5', '4.5', '5.5']
  const expected: number = 3.5
  const actual: number = average(arr)
  t.is(actual, expected)
})

test('getOccurrences should return 0 when the value is not found in the array', (t: any) => {
  const arr: string[] = ['hello', 'goodbye', 'welcome']
  const v: string = 'adios'
  const expected: number = 0
  const actual = getOccurrences(arr, v)
  t.is(actual, expected)
})
test('getOccurrences should return the correct count when the value is found in the array', (t: any) => {
  const arr: string[] = ['hello', 'goodbye', 'welcome', 'goodbye', 'welcome']
  const v = 'goodbye'
  const expected: number = 2
  const actual = getOccurrences(arr, v)
  t.is(actual, expected)
})
test('getOccurrences should be able to deal with case-sensitive values', (t: any) => {
  const arr: string[] = ['hello', 'Goodbye', 'welcome', 'GOODBYE', 'wElcome']
  const v: string = 'Goodbye'
  const expected: number = 1
  const actual = getOccurrences(arr, v)
  t.is(actual, expected)
})
test('getOccurrences should be able to deal with special characters', (t: any) => {
  const arr: string[] = ['hello', 'goodbye', 'welcome', '!', '!', '!']
  const v: string = '!'
  const expected: number = 3
  const actual = getOccurrences(arr, v)
  t.is(actual, expected)
})

test('wordFreq should return an empty array when passed an empty array', (t: any) => {
  const arr: string[] = []
  const expected: string[] = []
  const actual = wordFreq(arr)
  t.deepEqual(actual, expected)
})
test('wordFreq should return an array of strings of frequencies when passed an array of strings', (t: any) => {
  const arr: string[] = ['hello', 'goodbye', 'welcome', 'hello', 'adios', 'goodbye', 'box']
  const expected: string[] = ['2', '2', '1', '1', '1']
  const actual = wordFreq(arr)
  t.deepEqual(actual, expected)
})

test('wordFreq should handle case-sensitive values', (t: any) => {
  const arr: string[] = ['hello', 'Goodbye', 'welcome', 'GOODBYE', 'wElcome']
  const expected: string[] = ['1', '1', '1', '1', '1']
  const actual = wordFreq(arr)
  t.deepEqual(actual, expected)
})

test('getWords should return an array of strings', (t: any) => {
  const result = getWords([
    { todays_word: 'apple' },
    { todays_word: 'banana' },
    { todays_word: 'cherry' }
  ])
  t.true(Array.isArray(result))
  t.true(result.every((elem) => typeof elem === 'string'))
})
test('getWords should return the correct words', (t: any) => {
  const result = getWords([
    { todays_word: 'apple' },
    { todays_word: 'banana' },
    { todays_word: 'cherry' }
  ])
  t.deepEqual(result, ['"apple"', '"banana"', '"cherry"'])
})

test('getWords should handle empty input', (t: any) => {
  const result = getWords([])
  t.deepEqual(result, [])
})

test('getFaces should return an array of strings', (t: any) => {
  const result = getFaces([
    { face_id: '1' },
    { face_id: '4' },
    { face_id: '3' }
  ])
  t.true(Array.isArray(result))
  t.true(result.every((elem) => typeof elem === 'string'))
})
test('getFaces should return the correct face IDs', (t: any) => {
  const result = getFaces([
    { face_id: '1' },
    { face_id: '4' },
    { face_id: '3' }
  ])
  t.deepEqual(result, ['"1"', '"4"', '"3"'])
})
test('getFaces should handle empty input', (t: any) => {
  const result = getFaces([])
  t.deepEqual(result, [])
})

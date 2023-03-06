// // import sinon from 'sinon';

// import test from 'ava';
// import { average, getOccurrences, wordFreq } from '../functions/mhfunctions';

// test('average should return the correct value for an array of numbers', t => {
//   const arr: number[] = [1, 2, 3, 4, 5];
//   const expected: number = 3;
//   const actual: number = average(arr);
//   t.is(actual, expected);
// });

// test('average should return 0 for an empty array', t => {
//   const arr: number[] = [];
//   const expected: number = 0;
//   const actual: number = average(arr);
//   t.is(actual, expected);
// });

// test('average should handle negative numbers', t => {
//   const arr: number[] = [-1, -2, -3, -4, -5];
//   const expected: number = -3;
//   const actual: number = average(arr);
//   t.is(actual, expected);
// });

// test('average should handle decimal numbers', t => {
//   const arr: number[] = [1.5, 2.5, 3.5, 4.5, 5.5];
//   const expected: number = 3.5;
//   const actual: number = average(arr);
//   t.is(actual, expected);
// });

// test('getOccurrences should return 0 when the value is not found in the array', t => {
//     const arr: string[] = ['hello', 'bar', 'baz'];
//     const v:string = 'qux';
//     const expected: number = 0;
//     const actual = getOccurrences(arr, v);
//     t.is(actual, expected);
//   });
  
//   test('getOccurrences should return the correct count when the value is found in the array', t => {
//     const arr: string[] = ['hello', 'bar', 'baz', 'bar', 'baz'];
//     const v = 'bar';
//     const expected: number = 2;
//     const actual = getOccurrences(arr, v);
//     t.is(actual, expected);
//   });
  
//   test('getOccurrences should handle case-sensitive values', t => {
//     const arr: string[] = ['hello', 'Bar', 'baz', 'BAR', 'bAz'];
//     const v: string = 'Bar';
//     const expected: number = 1;
//     const actual = getOccurrences(arr, v);
//     t.is(actual, expected);
//   });
  
//   test('getOccurrences should handle special characters', t => {
//     const arr: string[] = ['hello', 'bar', 'baz', '@', '@', '@'];
//     const v: string = '@';
//     const expected: number = 3;
//     const actual = getOccurrences(arr, v);
//     t.is(actual, expected);
//   });

//   test('wordFreq should return an empty array when passed an empty array', t => {
//     const arr: string[] = [];
//     const expected: string[] = [];
//     const actual = wordFreq(arr);
//     t.deepEqual(actual, expected);
//   });
  
//   test('wordFreq should return an array of strings when passed an array of strings', t => {
//     const arr: string[] = ['hello', 'bar', 'baz', 'hello', 'qux', 'bar', 'quux'];
//     const expected: string[] = ['hello', '2', 'bar', '2', 'baz', '1', 'qux', '1', 'quux', '1'];
//     const actual = wordFreq(arr);
//     t.deepEqual(actual, expected);
//   });
  
//   test('wordFreq should handle case-sensitive values', t => {
//     const arr: string[] = ['hello', 'Bar', 'baz', 'BAR', 'bAz'];
//     const expected: string[] = ['hello', '1', 'Bar', '1', 'baz', '1', 'BAR', '1', 'bAz', '1'];
//     const actual = wordFreq(arr);
//     t.deepEqual(actual, expected);
//   });
  
//   test('wordFreq should handle special characters', t => {
//     const arr: string[] = ['hello', 'bar', 'baz', '@', '@', '@'];
//     const expected: string[] = ['hello', '1', 'bar', '1', 'baz', '1', '@', '3'];
//     const actual = wordFreq(arr);
//     t.deepEqual(actual, expected);
//   });

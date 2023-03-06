// import sinon from 'sinon';

import test from 'ava';
import { average, getOccurrences, wordFreq, arrayOfObjectsToStrings, getWords } from '../../../../../functions/mhfunctions';
interface Obj {
    [word: string]: any;
  }

test('average should return the correct value for an array of numbers', t => {
  const arr: number[] = [1, 2, 3, 4, 5];
  const expected: number = 3;
  const actual: number = average(arr);
  t.is(actual, expected);
});

test('average should return 0 for an empty array', t => {
  const arr: number[] = [];
  const expected: number = 0;
  const actual: number = average(arr);
  t.is(actual, expected);
});

test('average should be able to deal with negative numbers', t => {
  const arr: number[] = [-1, -2, -3, -4, -5];
  const expected: number = -3;
  const actual: number = average(arr);
  t.is(actual, expected);
});

test('average should be able to deal with decimal numbers', t => {
  const arr: number[] = [1.5, 2.5, 3.5, 4.5, 5.5];
  const expected: number = 3.5; 
  const actual: number = average(arr);
  t.is(actual, expected);
});

test('getOccurrences should return 0 when the value is not found in the array', t => {
    const arr: string[] = ['hello', 'goodbye', 'welcome'];
    const v:string = 'adios';
    const expected: number = 0;
    const actual = getOccurrences(arr, v);
    t.is(actual, expected);
  });
  
  test('getOccurrences should return the correct count when the value is found in the array', t => {
    const arr: string[] = ['hello', 'goodbye', 'welcome', 'goodbye', 'welcome'];
    const v = 'goodbye';
    const expected: number = 2;
    const actual = getOccurrences(arr, v);
    t.is(actual, expected);
  });
  
  test('getOccurrences should be able to deal with case-sensitive values', t => {
    const arr: string[] = ['hello', 'Goodbye', 'welcome', 'GOODBYE', 'wElcome'];
    const v: string = 'Goodbye';
    const expected: number = 1;
    const actual = getOccurrences(arr, v);
    t.is(actual, expected);
  });
  
  test('getOccurrences should be able to deal with special characters', t => {
    const arr: string[] = ['hello', 'goodbye', 'welcome', '!', '!', '!'];
    const v: string = '!';
    const expected: number = 3;
    const actual = getOccurrences(arr, v);
    t.is(actual, expected);
  });

  test('wordFreq should return an empty array when passed an empty array', t => {
    const arr: string[] = [];
    const expected: string[] = [];
    const actual = wordFreq(arr);
    t.deepEqual(actual, expected);
  });
  
  test('wordFreq should return an array of strings when passed an array of strings', t => {
    const arr: string[] = ['hello', 'goodbye', 'welcome', 'hello', 'adios', 'goodbye', 'box'];
    const expected: string[] = ['hello', '2', 'goodbye', '2', 'welcome', '1', 'adios', '1', 'box', '1'];
    const actual = wordFreq(arr);
    t.deepEqual(actual, expected);
  });
  
  test('wordFreq should handle case-sensitive values', t => {
    const arr: string[] = ['hello', 'Goodbye', 'welcome', 'GOODBYE', 'wElcome'];
    const expected: string[] = ['hello', '1', 'Goodbye', '1', 'welcome', '1', 'GOODBYE', '1', 'wElcome', '1'];
    const actual = wordFreq(arr);
    t.deepEqual(actual, expected);
  });
  
  test('wordFreq should handle special characters', t => {
    const arr: string[] = ['hello', 'goodbye', 'welcome', '?', '?', '?'];
    const expected: string[] = ['hello', '1', 'goodbye', '1', 'welcome', '1', '?', '3'];
    const actual = wordFreq(arr);
    t.deepEqual(actual, expected);
  });

  test('arrayOfObjectsToStrings should return an empty array when passed an empty array', (t) => {
    const input: Obj[] = [];
    const expectedOutput: string[][] = [];
    const output = arrayOfObjectsToStrings(input);
    t.deepEqual(output, expectedOutput);
  });
  
  test('arrayOfObjectsToStrings should convert an array of objects to an array of arrays of strings', (t) => {
    const input = [
      { name: 'Vishal', age: 20 },
      { name: 'Manik', age: 40 },
      { name: 'Saath', age: 60 },
    ];
    const expectedOutput = [
      ['Vishal', '20'],
      ['Manik', '40'],
      ['Saath', '60'],
    ];
    const output = arrayOfObjectsToStrings(input);
    t.deepEqual(output, expectedOutput);
  });
  
  test('arrayOfObjectsToStrings should convert an array of objects with mixed types to an array of arrays of strings', (t) => {
    const input = [
      { name: 'Vishal', age: 20, active: true },
      { name: 'Manik', age: '40', active: false },
      { name: 'Saath', age: null, active: undefined },
    ];
    const expectedOutput = [
      ['Vishal', '20', 'true'],
      ['Manik', '40', 'false'],
      ['Saath', 'null', 'undefined'],
    ];
    const output = arrayOfObjectsToStrings(input);
    t.deepEqual(output, expectedOutput);
  });

  test('getWords returns empty array if input is empty', (t) => {
    const result = getWords([]);
    t.deepEqual(result, []);
  });
  
  test('getWords returns empty array if all inner arrays are empty', (t) => {
    const result = getWords([[], [], []]);
    t.deepEqual(result, []);
  });
  
  test('getWords returns first element of each inner array', (t) => {
    const result = getWords([['apple', 'banana'], ['cat', 'dog'], ['elephant']]);
    t.deepEqual(result, ['apple', 'cat', 'elephant']);
  });
  
  test('getWords ignores empty strings', (t) => {
    const result = getWords([['apple', '', 'banana'], ['cat', 'dog', ''], ['elephant']]);
    t.deepEqual(result, ['apple', 'cat', 'elephant']);
  });

  test('combining getWords and arrayOfObjectsToStrings', (t) => {
    const input = [
        { name: 'Vishal', age: 20, active: true },
        { name: 'Manik', age: '40', active: false },
        { name: 'Saath', age: null, active: undefined },
      ];
      const expectedOutput = [
        ['Vishal', '20', 'true'],
        ['Manik', '40', 'false'],
        ['Saath', 'null', 'undefined'],
      ];
    const result = getWords(expectedOutput);
    t.deepEqual(result, ['Vishal', 'Manik', 'Saath']);
  });
  
  
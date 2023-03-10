interface Obj {
    [word: string]: any;
  }

import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'

const supabaseQuery = new supabaseQueryClass();
// average function
// words count
// words to array



export function arrayOfObjectsToStrings(arr: Obj[]): string[][] {
    const result: string[][] = [];
  
    for (const obj of arr) {
      const values = Object.values(obj).map((value) => String(value));
      result.push(values);
    }
    return result;
  }

export function getWords(arr: string[][]): string[] {
    const result: string[] = [];

    for (const insideArr of arr) {
        if (insideArr.length > 0) {
        result.push(insideArr[0]);
        }
    }
    result.filter((value) => value !== "")

    return result;
}

export function getFaces(arr: string[][]): number[] {
    const result: number[] = [];

    for (const insideArr of arr) {
        if (insideArr.length > 0) {
//        try{
            result.push(parseFloat(insideArr[0]));
//        }
//        catch(Error: unknown){
            
        }
//        }
    }

    return result;
}

export function average(arr: number[]): number{
    if(arr.length == 0){
        return 0
    }
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum/arr.length;
    return average
}

export function getOccurrences(arr: string[], v: string): number{
    var count = 0;
    arr.forEach((elem) => (elem === v && count++));
    return count;
}

export function wordFreq(arr: string[]): Map<string, number> {
    const freqMap = new Map<string, number>();
    for (const word of arr) {
      freqMap.set(word, getOccurrences(arr, word));
    }
    return freqMap;
  }
  





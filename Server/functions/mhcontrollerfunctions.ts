interface Obj {
    [word: string]: any;
  }
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
const supabaseQuery = new supabaseQueryClass();
// average function
// words count
// words to array

export async function returnWords(): Promise<object>{
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at');
        if(error){
            console.log("Failed to return last 7 words")
            return {mssg : "Failed to return last 7 words"}
        }
        else{
            return data
        }
}

export async function returnFaces(): Promise<object>{
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
        if(error){
            console.log("Failed to return last 7 faces")
            return {mssg : "Failed to return last 7 faces"}
        }
        else{
            return data
        }
}

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
        result.push(parseFloat(insideArr[0]));
        }
    }

    return result;
}

export function average(arr: number[]){
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum/arr.length;
}

export function getOccurrences(arr: string[], v: string): number{
    var count = 0;
    arr.forEach((elem) => (elem === v && count++));
    return count;
}

export function wordFreq(arr: string[]): string[]{
    const newarr: string[] = []
    for(const elem of arr){
        newarr.push(elem, getOccurrences(arr, elem).toString())
    }
    return newarr
}





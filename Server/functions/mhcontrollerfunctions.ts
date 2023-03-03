interface Obj {
    [word: string]: any;
  }
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
const supabaseQuery = new supabaseQueryClass();
// average function
// words count
// words to array

async function returnWords(): Promise<object>{
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at');
        if(error){
            console.log("Failed to return last 7 words")
            return {mssg : "Failed to return last 7 words"}
        }
        else{
            return data
        }
}

async function returnFaces(): Promise<object>{
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
        if(error){
            console.log("Failed to return last 7 faces")
            return {mssg : "Failed to return last 7 faces"}
        }
        else{
            return data
        }
}

function arrayOfObjectsToStrings(arr: Obj[]): string[][] {
    const result: string[][] = [];
  
    for (const obj of arr) {
      const values = Object.values(obj).map((value) => String(value));
      result.push(values);
    }
    return result;
  }

function getWords(arr: string[][]): string[] {
    const result: string[] = [];

    for (const insideArr of arr) {
        if (insideArr.length > 0) {
        result.push(insideArr[0]);
        }
    }
    result.filter((value) => value !== "")

    return result;
}

function getFaces(arr: string[][]): number[] {
    const result: number[] = [];

    for (const insideArr of arr) {
        if (insideArr.length > 0) {
        result.push(parseFloat(insideArr[0]));
        }
    }

    return result;
}

function average(arr: number[]){
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const average = sum/arr.length;
}

function wordFreq(arr: string[]){
    const counts = {};
for (const val of arr) {
  if (counts[val]) {
    counts[val]++;
  } else {
    counts[val] = 1;
  }
}
}




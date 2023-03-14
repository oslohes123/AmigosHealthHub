import {supabaseQueryClass} from '../utils/databaseInterface'

const supabaseQuery = new supabaseQueryClass();

export function getWords(arr: any): string[] {
  if(arr.length == 0){
    return []
}
   const result: string[] = [];
  for(let i = 0; i < arr.length; i++){
    result.push(JSON.stringify(arr[i]["todays_word"]))
  }
  return result
}

export function getFaces(arr: any): string[] {
  if(arr.length == 0){
    return []
}
  const result: string[] = [];
  for(let i = 0; i < arr.length; i++){
    result.push(JSON.stringify(arr[i]["face_id"]))
  }
  return result;
}

export function average(arr: string[]): number{
  if(arr.length == 0){
      return 0
  }
  const result: number[] = []
  for(let i = 0; i < arr.length; i++){
    result.push(parseFloat(arr[i]))
  }
  const sum = result.reduce((acc, val) => acc + val, 0);
  const average = sum/arr.length;
  return average
}

export function getOccurrences(arr: string[], v: string): number{
  var count = 0;
  arr.forEach((elem) => (elem === v && count++));
  return count;
}

export function wordFreq(arr: string[]): string[]{
  const newarr: string[] = []
  const nodupes: string[] = []
  for(const elem of arr){
    if (!nodupes.includes(elem)) {
      nodupes.push(elem);
  }
  }
  for(const item of nodupes){
      newarr.push(item, getOccurrences(arr, item).toString())
  }
  return newarr
}
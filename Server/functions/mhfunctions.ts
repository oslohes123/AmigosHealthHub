// // interface Obj {
// //     [word: string]: any;
// //   }

// // // import supabase from '../utils/supabaseSetUp'
// // // import {supabaseQueryClass} from '../utils/databaseInterface'

// // // const supabaseQuery = new supabaseQueryClass();
// // // // average function
// // // // words count
// // // // words to array



// // // export function arrayOfObjectsToStrings(arr: Obj[]): string[][] {
// // //     const result: string[][] = [];
// // //     if(arr.length == 1){
// // //       result.push(arr[0].stringify)
// // //       return result
// // //     }
// // //     for (const obj of arr) {
// // //       const values = Object.values(obj).map((value) => String(value));
// // //       result.push(values);
// // //     }
// // //     return result;
// // //   }

// // // export function getWords(arr: string[][]): string[] {
// // //     const result: string[] = [];
// // //     // if(arr.length == 1){
// // //     //   if(arr[0].length == 0){
// // //     //     return []
// // //     //   }
// // //     //   else{
// // //     //     result.push((arr[0][0]))
// // //     //     return result
// // //     //   }
// // //     // }
// // //     for (const insideArr of arr) {
// // //         if (insideArr.length > 0) {
// // //         result.push(insideArr[0]);
// // //         }
// // //     }
// // //     result.filter((value) => value !== "")

// // //     return result;
// // // }

// // // export function getFaces(arr: string[][]): number[] {
// // //     const result: number[] = [];
// // //     // if(arr.length == 1){
// // //     //   if(arr[0].length == 0){
// // //     //     return []
// // //     //   }
// // //     //   else{
// // //     //     result.push(parseFloat(arr[0][0]))
// // //     //     return result
// // //     //   }
// // //     // }
// // //     for (const insideArr of arr) {
// // //         if (insideArr.length > 0) {
// // // //        try{
// // //             result.push(parseFloat(insideArr[0]));
// // // //        }
// // // //        catch(Error: unknown){
            
// // //         }
// // //         else continue
// // // //        }
// // //     }

// // //     return result;
// // // }

// // // export function average(arr: number[]): number{
// // //     if(arr.length == 0){
// // //         return 0
// // //     }
// // //     if(arr.length == 1){
// // //       return 1
// // //     }
// // //     const sum = arr.reduce((acc, val) => acc + val, 0);
// // //     const average = sum/arr.length;
// // //     return average
// // // }

// // // export function getOccurrences(arr: string[], v: string): number{
// // //     var count = 0;
// // //     arr.forEach((elem) => (elem === v && count++));
// // //     return count;
// // // }

// // // export function wordFreq(arr: string[]): Map<string, number> {
// // //     const freqMap = new Map<string, number>();
// // //     if(arr.length == 1){
// // //       freqMap.set(arr[0], 1)
// // //       return freqMap
// // //     }
// // //     for (const word of arr) {
// // //       freqMap.set(word, getOccurrences(arr, word));
// // //     }
// // //     return freqMap;
// // //   }
  




// // interface Obj {
// //   [word: string]: any;
// // }

// // import supabase from '../utils/supabaseSetUp'
// // import {supabaseQueryClass} from '../utils/databaseInterface'

// // const supabaseQuery = new supabaseQueryClass();
// // // average function
// // // words count
// // // words to array



// // export function arrayOfObjectsToStrings(arr: Obj[]): string[][] {
// //   const result: string[][] = [];

// //   for (const obj of arr) {
// //     const values = Object.values(obj).map((value) => String(value));
// //     result.push(values);
// //   }
// //   return result;
// // }

// // export function getWords(arr: string[][]): string[] {
// //   const result: string[] = [];

// //   for (const insideArr of arr) {
// //       if (insideArr.length > 0) {
// //       result.push(insideArr[0]);
// //       }
// //   }
// //   result.filter((value) => value !== "")

// //   return result;
// // }

// // export function getFaces(arr: string[][]): number[] {
// //   const result: number[] = [];

// //   for (const insideArr of arr) {
// //       if (insideArr.length > 0) {
// // //        try{
// //           result.push(parseFloat(insideArr[0]));
// // //        }
// // //        catch(Error: unknown){
          
// //       }
// // //        }
// //   }

// //   return result;
// // }

// // export function average(arr: number[]): number{
// //   if(arr.length == 0){
// //       return 0
// //   }
// //   const sum = arr.reduce((acc, val) => acc + val, 0);
// //   const average = sum/arr.length;
// //   return average
// // }

// // export function getOccurrences(arr: string[], v: string): number{
// //   var count = 0;
// //   arr.forEach((elem) => (elem === v && count++));
// //   return count;
// // }

// // export function wordFreq(arr: string[]): string[]{
// //   const newarr: string[] = []
// //   for(const elem of arr){
// //       newarr.push(elem, getOccurrences(arr, elem).toString())
// //   }
// //   return newarr
// // }
// interface Obj {
//   [word: string]: any;
// }

// import supabase from '../utils/supabaseSetUp'
// import {supabaseQueryClass} from '../utils/databaseInterface'

// const supabaseQuery = new supabaseQueryClass();
// // average function
// // words count
// // words to array



// export function arrayOfObjectsToStrings(arr:Obj[]): string[][] {
//   const result: string[][] = [];

//   // for (const obj of arr) {
//   //   const values = Object.values(obj).map((value) => String(value));
//   //   result.push(values);
//   // }
//   for(let i = 0; i < arr.length; i++){
//     let values = Object.values(arr[i]).map((value) => String(value));
//     result.push(values);
//   }
//   console.log(`result: ${ result }`)
//   return result;
// }

// export function getWords(arr: string[][]): string[] {
//   const result: string[] = [];

//   for (const insideArr of arr) {
//       if (insideArr.length > 0) {
//       result.push(insideArr[0]);
//       }
//   }
//   result.filter((value) => value !== "")

//   return result;
// }

// export function getFaces(arr: string[][]): number[] {
//   const result: number[] = [];

//   for (const insideArr of arr) {
//       if (insideArr.length > 0) {
// //        try{
//           result.push(parseFloat(insideArr[0]));
// //        }
// //        catch(Error: unknown){
          
//       }
// //        }
//   }

//   return result;
// }

// export function average(arr: number[]): number{
//   if(arr.length == 0){
//       return 0
//   }
//   const sum = arr.reduce((acc, val) => acc + val, 0);
//   const average = sum/arr.length;
//   return average
// }

// export function getOccurrences(arr: string[], v: string): number{
//   var count = 0;
//   arr.forEach((elem) => (elem === v && count++));
//   return count;
// }

// export function wordFreq(arr: string[]): string[]{
//   const newarr: string[] = []
//   for(const elem of arr){
//       newarr.push(elem, getOccurrences(arr, elem).toString())
//   }
//   return newarr
// }
interface Obj {
  [word: string]: any;
}

import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'

const supabaseQuery = new supabaseQueryClass();
// average function
// words count
// words to array



 export function arrayOfObjectsToStrings(arr:Obj[]): string[][] {
   const result: string[][] = [];
//    for (const obj of arr) {
//    const values = Object.values(obj).map((value) => String(value));
//    result.push(values);
//  }
    for(let i = 0; i < arr.length; i++){
      let values = Object.values(arr[i]).map((value) => String(value));
      result.push(values);
    }
   console.log(`result: ${ result }`)
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

export function wordFreq(arr: string[]): string[]{
  const newarr: string[] = []
  for(const elem of arr){
      newarr.push(elem, getOccurrences(arr, elem).toString())
  }
  return newarr
}

// require('dotenv').config()
// import { Request, Response } from 'express';
// import supabase from '../utils/supabaseSetUp'
// import {supabaseQueryClass} from '../utils/databaseInterface'
// import { arrayOfObjectsToStrings, getWords, getFaces, average, getOccurrences, wordFreq} from '../functions/mhfunctions'
// const supabaseQuery = new supabaseQueryClass();


// // export const wordValues = async(req:Request,res:Response) => {
// //     // return res.status(200).json({mssg: "MentalHealthOverview"})
// //     const { id } = req.headers
// //     const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at', id);
// //         if(error){
// //             console.log("Failed to return last 7 words")
// //             return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
// //         }
// //         else{
// //             return res.status(200).json({mssg: "MentalHealthOverview", words: data, freq: wordFreq(data)})
// //         }
// //     }
        
  
// // export const faceValues = async(req:Request,res:Response) =>{
// //     const { id } = req.headers
// //     const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at', id);
// //         if(error){
// //             console.log("Failed to return last 7 faces")
// //             return res.status(400).json({mssg : "Failed to return last 7 faces"})
// //         }
// //         else{
// //             return res.status(200).json({mssg: "Retrieved words",faces: data, average: average(getFaces(arrayOfObjectsToStrings(data))), success: "successful"}) 
// //         } 
// // }        
 
// // export const reviewDay = async(req:Request,res:Response) => {
// //     return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
// // }
// // // take face and name from req.body

// // require('dotenv').config()
// // import { Request, Response } from 'express';
// // import supabase from '../utils/supabaseSetUp'
// // import {supabaseQueryClass} from '../utils/databaseInterface'
// // import { arrayOfObjectsToStrings, getWords, getFaces, average, getOccurrences, wordFreq} from '../functions/mhfunctions'
// // const supabaseQuery = new supabaseQueryClass();


// export const wordValues = async(req:Request,res:Response) => {
//     // return res.status(200).json({mssg: "MentalHealthOverview"})
//     const { id } = req.headers
//     // const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at', id);
//     const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at', id);
//         if(error){
//             console.log("Failed to return last 7 words")
//             return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
//         }
//         else{
//             // return res.status(200).json({mssg: "MentalHealthOverview", words: data, freq: wordFreq(getWords((arrayOfObjectsToStrings(data))))})
//             return res.status(200).json({mssg: "MentalHealthOverview", words: data, freq: wordFreq(getWords(data))})
//         }
//     }
        
  
// export const faceValues = async(req:Request,res:Response) =>{
//     const { id } = req.headers
//     //const { data,error }:any = await supabaseQuery.selectWhere(supabase, 'Mental Health', 'user_id', id, 'face_id')
//     const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at', id);
//     //const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
//         if(error){
//             console.log("Failed to return last 7 faces")
//             return res.status(400).json({mssg : "Failed to return last 7 faces"})
//         }
//         else{
//             //console.log(`line32: ${ JSON.stringify(data) }`);
//             // return res.status(200).json({mssg: "Retrieved words",faces: data, average: average(getFaces(arrayOfObjectsToStrings(data))), success: "successful"})
//             // return res.status(200).json({mssg: "Retrieved words",faces: data, average: average(getFaces(data)), success: "successful"})
//             console.log(`data: ${ JSON.stringify(data) }`)
//             return res.status(200).json({mssg: "Retrieved words",faces: data, success: "successful"}) 
//         } 
// }        
 
//             // 


// export const reviewDay = async(req:Request,res:Response) => {
//     return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
// }
// // take face and name from req.body
require('dotenv').config()
import { Request, Response } from 'express';
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
import { arrayOfObjectsToStrings, getWords, getFaces, average, getOccurrences, wordFreq} from '../functions/mhfunctions'
const supabaseQuery = new supabaseQueryClass();


export const wordValues = async(req:Request,res:Response) => {
    // return res.status(200).json({mssg: "MentalHealthOverview"})
    const { id } = req.headers
    // const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at', id);
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at', id);
        if(error){
            console.log("Failed to return last 7 words")
            return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
        }
        else{
            const freq = wordFreq(getWords((arrayOfObjectsToStrings(data))))
            console.log(`this: ${JSON.stringify(data)}`)
             return res.status(200).json({mssg: "MentalHealthOverview", words: data, freq: freq})
             
            // return res.status(200).json({mssg: "MentalHealthOverview", words: data})
        }
    }
        
  
export const faceValues = async(req:Request,res:Response) =>{
    const { id } = req.headers
    //const { data,error }:any = await supabaseQuery.selectWhere(supabase, 'Mental Health', 'user_id', id, 'face_id')
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at', id);
    //const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
        if(error){
            console.log("Failed to return last 7 faces")
            return res.status(400).json({mssg : "Failed to return last 7 faces"})
        }
        else{
            //console.log(`line32: ${ JSON.stringify(data) }`);
            return res.status(200).json({mssg: "Retrieved words",faces: data, average: average(getFaces(arrayOfObjectsToStrings(data))), success: "successful"}) 
        } 
}        
 
            // 


export const reviewDay = async(req:Request,res:Response) => {
    return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
}
// take face and name from req.body
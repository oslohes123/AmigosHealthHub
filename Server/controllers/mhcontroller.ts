require('dotenv').config()

import { Request, Response } from 'express';
import { arrayOfObjectsToStrings, average, getFaces, getOccurrences, getWords, returnFaces, returnWords, wordFreq } from '../functions/mhfunctions'

import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'

const supabaseQuery = new supabaseQueryClass();

// async function getLastSevenWords(): Promise<object>{
//     const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','MH_ID','created_at');
//     if(error){
//         console.log("Failed to return last 7 words")
//         return { mssg:"Failed to retrieve last 7 words" }
//         // return res.status(400).json({mssg:"Failed to delete account!"})
//     }
//     else{
//         console.log("Words returned")
//         return { data }
//     }
// }
export const mainPage = async(req:Request,res:Response) => {
    // return res.status(200).json({mssg: "MentalHealthOverview"})
    // const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at');
    //     if(error){
    //         console.log("Failed to return last 7 words")
    //         return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
    //     }
    //     else{
    //         const worddata = data
    //     }
    let words: any
    let faces: any
        try{
            words = await returnWords() 
            console.log(JSON.stringify(words))
            // return res.status(200).json({mssg: "Words retrieved", 'words': words})
        }
        catch(Error: unknown){
            return res.status(400).json({mssg:"Failed to retrieve last 7 words"})
        }

        try{
            faces = await returnFaces() 
            console.log(JSON.stringify(faces))
            // return res.status(200).json({mssg: "Words retrieved", 'faces': faces})
        }
        catch(Error: unknown){
            return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
        }

        return res.status(200).json({mssg: "Retrieved words", words:words, faces: await returnFaces()}) 
    }
        
        // const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
        // if(error){
        //     console.log("Failed to return last 7 faces")
        //     return {mssg : "Failed to return last 7 faces"}
        
        
 
            // 


export const reviewDay = async(req:Request,res:Response) => {
    return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
}
// take face and name from req.body

// take face and name from req.body

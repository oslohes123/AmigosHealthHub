// require('dotenv').config()
import { Request, Response } from 'express';
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

// export const graph = async(req:Request,res:Response) => {}
    const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','todays_word','created_at');
    if(error){
        console.log("Failed to return last 7 words")
        return res.status(400).json({mssg:"Failed to retrieve last 7 words"})
    }

    else{
        console.log("Words returned")
        
        const { data,error }:any = await supabaseQuery.mostrecent(supabase, 'Mental Health','face_id','created_at');
        if(error){
            console.log("Failed to return last 7 words")
            return res.status(400).json({mssg:"Failed to retrieve last 7 faces"})
        }
        else{
            console.log("Words returned")
            
        }
        return res.status(200).json({'words': data})
    }
}
// export const reviewDay = async(req:Request,res:Response) => {

// }
// take face and name from req.body

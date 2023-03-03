// require('dotenv').config()
import { Request, Response } from 'express';
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
const supabaseQuery = new supabaseQueryClass();



export const mainPage = async(req:Request,res:Response) => {
    return res.status(200).json({mssg: "MentalHealthOverview"})
}
// export const reviewDay = async(req:Request,res:Response) => {

// }
import { Request, Response } from "express"
import supabase from "../../utils/supabaseSetUp"
import { supabaseQueryClass } from "../../utils/databaseInterface"
export const getCompletedWorkouts =async (req:Request, res: Response) => {
    
    return res.status(200).json({mssg:"This is the getCompletedWorkouts page"})
}
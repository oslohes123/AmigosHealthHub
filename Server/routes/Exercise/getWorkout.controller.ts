import { Request, Response } from "express";
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();

export const getWorkout =async (req:Request, res: Response) => {
   const {userid, workoutname} = req.headers;
    
   if(!userid||!workoutname){
    return res.status(400).json({mssg:"userid nor workoutname can be empty!"})
   }
   const {data, error}: any = await databaseQuery.match(supabase, 'WorkoutPlans', '*', {userid, workoutname});
    if(error){
        console.log(error);
        return res.status(400).json({mssg: "Matching WorkoutPlans went wrong!"})
    }
    console.log(`ln17 data in getWorkout.controller: ${JSON.stringify(data)}`)
    if(data.length === 0){
        return  res.status(400).json({mssg: "User doesn't have a workout of that name!"})
    }
    const workoutPlanID = data[0].WorkoutPlanID;
    //user does have a workout under such a name
    
    // else{
    //     const {data, error}: any = await databaseQuery.selectWhere(supabase, 'WorkoutPlansWithExercises','WorkoutPlanID', data[0].WorkoutPlanID,'*');

    // }

}

const getWorkoutByID = async(workoutPlanID: string) => {

}
import { Request, Response } from "express"
import supabase from "../../utils/supabaseSetUp"
import { supabaseQueryClass } from "../../utils/databaseInterface"
import { getDate, getTime } from "../../utils/convertTimeStamptz";
const databaseQuery = new supabaseQueryClass();

export const getCompletedWorkouts =async (req:Request, res:Response) => {
    return res.status(200).json({mssg:"This is the getCompletedWorkouts page!"})
}

//Returns all of a user's completed workouts' names and dates
export const getAllCompletedWorkouts =async (req:Request, res: Response) => {
    const {userid} = req.headers;
    if(!userid){
        return res.status(400).json({mssg:"No userid provided!"})
    }
    const {data, error}:any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname, timestamp');

    if(error){
        return res.status(400).json({mssg:"Something went wrong!", error})
    }
    else{
        console.log(`data of completedWorkouts: ${JSON.stringify(data)}`);

        // let arrayOfDates = []
        // for(let i = 0; i< data.length;i++){
        //     arrayOfDates.push(getDate(data[i].timestamp))
        //     arrayOfDates.push(getTime(data[i].timestamp))
        // }

        for(let i = 0; i< data.length;i++){
          let timestamp = data[i].timestamp;
          delete data[i].timestamp;
          data[i].date = getDate(timestamp);
          data[i].time = getTime(timestamp);
        }
        console.log(`After mod completedWorkouts: ${JSON.stringify(data)}`);
        return res.status(200).json({mssg:"Got All Completed Workouts!"})
    }
}













export const addCompletedWorkouts =async (req:Request, res: Response) => {
    
    const {userid, workoutname, exercises} = req.body;

    if(!userid||!workoutname||!exercises){
     return res.status(400).json({mssg: "userid, workoutname or exercises is missing!"})
    }

    //1. Create a record in completed workouts
    const {data, error}: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', {userid, workoutname});
    if(error){
        return res.status(400).json({mssg: "Sorry something went wrong!", error})
    }
    const completedWorkoutID = data[0].completedWorkoutID;
    //2. Add each exercise in exercises to actual exercise
    const numberOfExercises = exercises.length;
    let arrayOfAEIDs = [];
    for(let i= 0; i<numberOfExercises;i++){
        
        console.log(`exercises[i]: ${exercises[i]}`)
        const {data, error}: any =  await databaseQuery.insert(supabase, 'ActualExercises', exercises[i]);
        
        if(error){
        console.log(error);
        return res.status(400).json({mssg: "Tracking a Workout Failed!", err: error})
        }
        arrayOfAEIDs.push(data[0].AEID);
        //possible exercise already exists
        
    }
    //3.  Create a record in TrackedWorkoutsWithExercises for each exercise in the workoutplan.
    for(let i = 0; i<arrayOfAEIDs.length; i++){
        const {data, error}: any = await databaseQuery.insert(supabase, 'TrackedWorkoutsWithExercises', {completedWorkoutID, AEID:arrayOfAEIDs[i]})
        if(error){
            return res.status(400).json({mssg:"Something went wrong!", error});
        }
    }
    return res.status(200).json({mssg: "Successfully tracked a workout!"})

}
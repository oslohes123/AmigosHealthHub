import { Request, Response } from "express"
import supabase from "../../utils/supabaseSetUp"
import { supabaseQueryClass } from "../../utils/databaseInterface"
import { getDate, getTime } from "../../utils/convertTimeStamptz";
const databaseQuery = new supabaseQueryClass();

//Get a specific workout by userid, workoutname, date and time
export const getACompletedWorkout =async (req:Request, res:Response) => {
    const {userid, workoutname, date, time}= req.headers;

    if(!userid|| !workoutname||!date||!time){
        return res.status(400).json({mssg:"No userid, workoutname, date or time"})
    }
    const {data, error}:any = await databaseQuery.match(supabase, 'CompletedWorkouts','completedWorkoutID, timestamp', {userid,workoutname});
    if(error){
        return res.status(400).json({mssg:"Something went wrong!", error})
    }
    console.log(`getACompletedWorkout: ${JSON.stringify(data)}`)

   //Break down each completed workouts' timestamp and match that with the one given in the headers
    let selectedWorkout;
    for(let i = 0; i< data.length;i++){
        if( getDate(data[i].timestamp) === date &&getTime(data[i].timestamp) === time ){
            selectedWorkout = data[i].completedWorkoutID
        }
    }
    if(!selectedWorkout){
        return res.status(400).json({mssg:"A workout of this name at this time does not exist for this user!"})
    }
    console.log(`selectedWorkout: ${selectedWorkout}`)

    const {errorPresent, workoutToReturn}: any = await getWorkoutByID(selectedWorkout)
    if(errorPresent){
        return res.status(400).json({mssg:"getWorkoutPlanById failed!", err: errorPresent});
    }
    return res.status(200).json({mssg:"Success!", workoutToReturn})
}

const getWorkoutByID = async( completedWorkoutID: string) => {
    const {data, error}: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises','completedWorkoutID', completedWorkoutID,'*');
    
    console.log(`getWorkoutByID: ${JSON.stringify(data)}`);

    const errorAndWorkout = {errorPresent: '', workoutToReturn:[""]};
    if(error) errorAndWorkout.errorPresent = error;
   
    else{
        let arrayOfAEID = [];
        for(let i = 0; i< data.length; i++){
            arrayOfAEID.push(data[i].AEID)
        }
        console.log(`arrayOfAEID: ${arrayOfAEID}`)

        let arrayOfPossibleExercises = []
        for (let j = 0; j<arrayOfAEID.length; j++){
            const {data, error}: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID',arrayOfAEID[j],'*');
            if(error) errorAndWorkout.errorPresent = error;
            else{
                arrayOfPossibleExercises.push(data[0])
                console.log(`data ln50 getWorkout: ${JSON.stringify(data)}`);
                console.log(`arrayOfPossibleExercises ln: ${JSON.stringify(arrayOfPossibleExercises)}`)
            }
        }

        for(let i = 0; i<arrayOfPossibleExercises.length; i++){
            const {data, error}: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID',arrayOfPossibleExercises[i].AEID,'*');
            if(error) errorAndWorkout.errorPresent = error;
            else{
                delete arrayOfPossibleExercises[i].exerciseID
                delete arrayOfPossibleExercises[i].userID
                // arrayOfPossibleExercises[i].exercise = data[0];
                console.log(`data ln65 getWorkout: ${JSON.stringify(data)}`);
                console.log(`arrayOfPossibleExercises ln 66: ${JSON.stringify(arrayOfPossibleExercises)}`)
            }
        }
        errorAndWorkout.workoutToReturn = arrayOfPossibleExercises;

    }
    return errorAndWorkout;
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
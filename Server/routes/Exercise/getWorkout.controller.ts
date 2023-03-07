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
    const {errorPresent, workoutToReturn}: any = await getWorkoutByID(workoutPlanID)
    if(errorPresent){
        return res.status(400).json({mssg:"getWorkoutPlanById failed!", err: errorPresent});
    }
    return res.status(200).json({mssg:"Success!", workoutToReturn})
}

const getWorkoutByID = async( workoutPlanID: string) => {
    const {data, error}: any = await databaseQuery.selectWhere(supabase, 'WorkoutPlansWithExercises','WorkoutPlanID', workoutPlanID,'*');
    console.log(`getWorkoutByID: ${JSON.stringify(data)}`);
    const errorAndWorkout = {errorPresent: '', workoutToReturn:[""]};
    if(error) errorAndWorkout.errorPresent = error;
    else{
        let arrayOfPEID = [];
        for(let i = 0; i< data.length; i++){
            arrayOfPEID.push(data[i].PEID)
        }
        console.log(`arrayOfPEID: ${arrayOfPEID}`)

        let arrayOfPossibleExercises = []
        for (let j = 0; j<arrayOfPEID.length; j++){
            const {data, error}: any = await databaseQuery.selectWhere(supabase, 'PossibleExercises', 'PEID',arrayOfPEID[j],'exerciseID, sets, duration, distance, warmUpSetFlag, calories, reps');
            if(error) errorAndWorkout.errorPresent = error;
            else{
                arrayOfPossibleExercises.push(data[0])
                console.log(`data ln50 getWorkout: ${JSON.stringify(data)}`);
                console.log(`arrayOfPossibleExercises ln: ${JSON.stringify(arrayOfPossibleExercises)}`)
            }
        }

        for(let i = 0; i<arrayOfPossibleExercises.length; i++){
            const {data, error}: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID',arrayOfPossibleExercises[i].exerciseID,'type, muscle, instructions, name, difficulty, equipment');
            if(error) errorAndWorkout.errorPresent = error;
            else{
                delete arrayOfPossibleExercises[i].exerciseID
                arrayOfPossibleExercises[i].exercise = data[0];
                console.log(`data ln65 getWorkout: ${JSON.stringify(data)}`);
                console.log(`arrayOfPossibleExercises ln 66: ${JSON.stringify(arrayOfPossibleExercises)}`)
            }
        }
        errorAndWorkout.workoutToReturn = arrayOfPossibleExercises;

    }
    return errorAndWorkout;
}
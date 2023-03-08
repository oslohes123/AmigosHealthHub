import { Request, Response } from "express";
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();

/**
 * Creates a WorkoutPlan, adds each exercise to PossibleExercises and adds
 * multiple records to WorkoutPlansWithExercises
 */
export const createWorkout =async (req:Request, res: Response) => {

  
   const {userid, workoutname, exercises} = req.body;

   if(!userid||!workoutname||!exercises){
    return res.status(400).json({mssg: "userid, workoutname or exercises is missing!"})
   }
    //1. Create a record in WorkoutPlans

    const {data, error}: any =  await databaseQuery.match(supabase, 'WorkoutPlans','*', {userid, workoutname});
    if(error){
        console.log(error);
        return res.status(400).json({mssg: "Matching the WorkoutPlans table went wrong!", err: error})
    }
    if(data.length >0){
        //A workout of the same name already belongs to the user
        return res.status(400).json({mssg: "A workout of the same name already belongs to the user"})
    }
    else{
        const {data, error}:any = await databaseQuery.insert(supabase, 'WorkoutPlans', {userid, workoutname})
        if(error){
            return res.status(400).json({mssg: "Inserting into WorkoutPlans table went wrong!", err: error})
        }
        console.log(`ln30: ${JSON.stringify(data)}`)
        const workoutPlanID = data[0].WorkoutPlanID;
    

    //2. For each item in the array of exercises of the workout plan,before adding to PossibleExercise, query whether it’s in the table,  add to PossibleExercise

    //Assuming that exercises is an array of JSON. eg. [{exercse: "bicep "}, {}], Each element must contain atleast some properties that allow it to be uniquely identified
    

        const numberOfExercises = exercises.length;
        let workoutPEIDs = [];
        for(let i= 0; i<numberOfExercises;i++){
            
            const { data, error}: any = await databaseQuery.match(supabase, 'PossibleExercises', 'PEID', exercises[i]);
            console.log(`ln41: ${JSON.stringify(data)} `)
            if(error){
                console.log(error);
                return res.status(400).json({mssg: "createWorkout Failed!", err: error})
            }

            else if (data.length > 0){
                workoutPEIDs.push(data[0].PEID);
            }
            //if no possible exercise matches the one given, then insert into the table
            else {
               const {data, error}: any =  await databaseQuery.insert(supabase, 'PossibleExercises', exercises[i]);
               if(error){
                console.log(error);
                return res.status(400).json({mssg: "createWorkout Failed!", err: error})
               }
               workoutPEIDs.push(data[0].PEID);
            }
            //possible exercise already exists
            
        }
        console.log(`workoutPEIDs: ${workoutPEIDs}`)
        // return res.status(200).json({mssg: "Step 2 done!"})

    //3. Create a record in WorkoutPlansWithExercises for each exercise in the workoutplan.
    
        for(let j = 0; j< workoutPEIDs.length; j++){
            const {error}: any = await databaseQuery.insert(supabase, 'WorkoutPlansWithExercises',{WorkoutPlanID: workoutPlanID, 'PEID':workoutPEIDs[j]});
            if(error){
                console.log(error);
                return res.status(400).json({mssg: "Inserting into WorkoutPlansWithExercises failed!", err: error})
            }
        }

        return res.status(200).json({mssg: "Workout Plan created!"})
    }

}
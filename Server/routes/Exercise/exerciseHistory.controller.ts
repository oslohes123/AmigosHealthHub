import { Request, Response } from "express"
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();
import removeDuplicates from "../../utils/removeDuplicates";
//getExerciseHistory by name of exercise
export const getExerciseHistory =async (req:Request, res: Response) => {
//    const {} = req.headers;
}

//Gets all exercise names a user has performed
export const getAllExercises =async (req:Request, res: Response)=> {
     const {userid}= req.headers;

     if(!userid){
        return res.status(400).json({mssg:"userid not provided!"});
     }
     const {data, error}: any = await databaseQuery.selectWhere(supabase, 'ActualExercises','userID', userid, 'exerciseID');

     if(error){
        return res.status(400).json({mssg:"Something went wrong", error});
     }
     console.log(`Selecting all actualexercise ids of a user: ${JSON.stringify(data)}`);

     let arrayOfExerciseIDs = [];
     for(let i = 0; i<data.length; i++){
        arrayOfExerciseIDs.push(data[i].exerciseID);
     }
     arrayOfExerciseIDs = removeDuplicates(arrayOfExerciseIDs)
     
     for(let i = 0; i<arrayOfExerciseIDs.length; i++){
       const {data, error}: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfExerciseIDs[i],'name');
       if(error){
        return res.status(400).json({mssg:"Something went wrong", error});
        }
        arrayOfExerciseIDs[i] = data[0].name
     }
     console.log(`arrayOfExerciseIDs: ${JSON.stringify(arrayOfExerciseIDs)}`);
      const arrayOfExerciseNames= arrayOfExerciseIDs;
     return res.status(200).json({mssg:"Success!",arrayOfExerciseNames });
}
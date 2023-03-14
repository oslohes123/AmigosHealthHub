import { Request, Response } from "express"
import supabase from "../../utils/supabaseSetUp";
import { supabaseQueryClass } from "../../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();
import removeDuplicates from "../../utils/removeDuplicates";
import { getDate, getTime } from "../../utils/convertTimeStamptz";
//getExerciseHistory by name of exercise

//return all exercises from actual exercises that match a given userid and exerciseid
const matchExercise =async (userID:string|string[],exerciseID:string ) => {
   const errorAndIDs:any = {errorPresent: '', exercisesMatch:[{},{}]};
   const {data, error}:any = await databaseQuery.match(supabase, 'ActualExercises','*', {userID, exerciseID})
   if(error){
      errorAndIDs.errorPresent = error;
      return errorAndIDs
   }
   else{
      errorAndIDs.exercisesMatch = data;
      return errorAndIDs
   }
}
//for weighted exercise return 2 arrays: array of dates(x-axis), array of weight pulled(y-axis)
//else return arrayOfCalories, arrayOfDuration, arrayOfDistance
export const getExerciseHistory =async (req:Request, res: Response) => {
   const {nameofexercise, userid} = req.headers;
   if(!nameofexercise||!userid){
      return res.status(400).json({mssg:"nameofexercise not provided!"});
   }

   let arrayOfWeightPulled = []
   let arrayOfDates = [];
   let arrayOfCalories = [];
   let arrayOfDuration = [];
   let arrayOfDistance = [];
   const {data, error}: any = await databaseQuery.selectWhere(supabase, 'Exercises','name',nameofexercise, 'ExerciseID, type');

     if(error){
        return res.status(400).json({mssg:"Something went wrong", error});
     }

     else{
         console.log(`exerciseID data: ${JSON.stringify(data)}`);
         const exerciseID = data[0].ExerciseID;
         const typeOfExercise = data[0].type;
         const {errorPresent,exercisesMatch}= await matchExercise(userid, exerciseID);
         if(errorPresent){
            return res.status(400).json({mssg:"Something went wrong", errorPresent});
         }
         else{
            // exercisesMatch: [{"AEID":"e0cc18ef-29d2-46e0-a4d8-62eaeeda0526","userID":"e9eae359-87cc-482c-8b08-0c4ce7d32c01","exerciseID":"b2265c54-7d15-4f40-9661-2043857db62f","sets":null,"duration":60,"distance":5000,"warmUpSet":false,"calories":50,"weight":null,"reps":null}]
            console.log(`exercisesMatch: ${JSON.stringify(exercisesMatch)}`);
            if(exercisesMatch.length > 0){
               if(typeOfExercise === "Weight"){
                  let arrayOfCompletedWorkoutIDs = [];
                  let arrayOfAEIDs = [];
                  //for each exercise, get the corresponding TrackedWorkoutWithExercises, then get its completedWorkoutID
                  for(let i = 0; i< exercisesMatch.length; i++){
                     const AEID = exercisesMatch[i].AEID;
                     arrayOfAEIDs.push(AEID);
                     const {data, error}: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'AEID', AEID, 'completedWorkoutID');
                     if(error){
                        return res.status(400).json({mssg:"Exercise has never been performed"});
                     }
                     if(data.length > 0){
                        arrayOfCompletedWorkoutIDs.push(data[0].completedWorkoutID)
                     }
                     else{
                        return res.status(400).json({mssg:"Exercise has never been performed"});
                     }
                     console.log(`ln53: ${JSON.stringify(data)}`)
                  }
                  //Not removing duplicates in case of the same workout twice in a day
                  //  arrayOfCompletedWorkoutIDs = removeDuplicates(arrayOfCompletedWorkoutIDs);
                   console.log(`arrayOfCompletedWorkoutIDs: ${JSON.stringify(arrayOfCompletedWorkoutIDs)}`)

                   for(let j = 0; j<arrayOfCompletedWorkoutIDs.length; j++){
                     const {data, error}:any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'timestamp',{userid,completedWorkoutID:arrayOfCompletedWorkoutIDs[j]});
                     if(error){
                        return res.status(400).json({mssg:"Failure Matching", error});
                     }
                     else{
                        console.log(`ln72: ${JSON.stringify(data)}`);
                        if(data.length > 0){
                           arrayOfDates.push(data[0].timestamp)
                        }
                        else{
                           return res.status(400).json({mssg:"Data.length ==0 for timestamp", error});
                        }
                     }
                   }
                   console.log(`arrayOfAEIDs:${arrayOfAEIDs}`)
                   console.log(`arrayOfDates:${arrayOfDates}`)

                   const transformedArray = arrayOfDates.map((x) => [getDate(x), getTime(x)])
                   console.log(`transformedArray:${transformedArray}`)
                   console.log(`transformedArray[0]:${transformedArray[0]}`)

                   
                   for(let i = 0; i< arrayOfAEIDs.length ; i++){
                     const {data, error}:any = await databaseQuery.selectWhere(supabase, 'ActualExercises','AEID', arrayOfAEIDs[i],'reps, weight, sets');
                     if(error){
                        return res.status(400).json({mssg:"SelectWhere failed", error});
                     }
                     else{
                        if(data.length > 0){
                           console.log(`weight pulled: ${JSON.stringify(data)}`)
                           const numberOfSets = data[0].sets;
                           const reps = data[0].reps;
                           const weight = data[0].weight;
                           console.log(`numberOfSets:${numberOfSets}`);
                           console.log(`reps: ${reps}`);
                           console.log(`weight:${weight}`)
                           //multiply each rep with corresponding weight
                           if(reps.length === numberOfSets && weight.length === numberOfSets){
                              let weightPulled:number = 0;
                              for(let j = 0; j<numberOfSets; j++){
                                 
                                 weightPulled = weightPulled + (reps[j] * weight[j])
                                 console.log(`weightPulled: ${weightPulled}`)
                              }
                              arrayOfWeightPulled.push(weightPulled);
                           }
                           console.log(`arrayOfWeightPulled:${arrayOfWeightPulled}`)
                           console.log(`arrayOfDates: ${transformedArray}`)
                        }
                        else{
                           return res.status(400).json({mssg:"Not in table failed"});
                        }
                       
                     }
                   }

               }

               else{
                  let arrayOfCompletedWorkoutIDs = [];
                  let arrayOfAEIDs = [];
                  //for each exercise, get the corresponding TrackedWorkoutWithExercises, then get its completedWorkoutID
                  for(let i = 0; i< exercisesMatch.length; i++){
                     const AEID = exercisesMatch[i].AEID;
                     arrayOfAEIDs.push(AEID);
                     const {data, error}: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'AEID', AEID, 'completedWorkoutID');
                     if(error){
                        return res.status(400).json({mssg:"Exercise has never been performed"});
                     }
                     if(data.length > 0){
                        arrayOfCompletedWorkoutIDs.push(data[0].completedWorkoutID)
                     }
                     else{
                        return res.status(400).json({mssg:"Exercise has never been performed"});
                     }
                     console.log(`ln53: ${JSON.stringify(data)}`)
                  }
                  //Not removing duplicates in case of the same workout twice in a day
                  //  arrayOfCompletedWorkoutIDs = removeDuplicates(arrayOfCompletedWorkoutIDs);
                   console.log(`arrayOfCompletedWorkoutIDs: ${JSON.stringify(arrayOfCompletedWorkoutIDs)}`)

                   for(let j = 0; j<arrayOfCompletedWorkoutIDs.length; j++){
                     const {data, error}:any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'timestamp',{userid,completedWorkoutID:arrayOfCompletedWorkoutIDs[j]});
                     if(error){
                        return res.status(400).json({mssg:"Failure Matching", error});
                     }
                     else{
                        console.log(`ln72: ${JSON.stringify(data)}`);
                        if(data.length > 0){
                           arrayOfDates.push(data[0].timestamp)
                        }
                        else{
                           return res.status(400).json({mssg:"Data.length ==0 for timestamp", error});
                        }
                     }
                   }
                   console.log(`arrayOfAEIDs:${arrayOfAEIDs}`)
                   console.log(`arrayOfDates:${arrayOfDates}`)

                   const transformedArray = arrayOfDates.map((x) => [getDate(x), getTime(x)])
                   console.log(`transformedArray:${transformedArray}`)
                   console.log(`transformedArray[0]:${transformedArray[0]}`)

                   
                   for(let i = 0; i< arrayOfAEIDs.length ; i++){
                     const {data, error}:any = await databaseQuery.selectWhere(supabase, 'ActualExercises','AEID', arrayOfAEIDs[i],'calories, duration, distance');
                     if(error){
                        return res.status(400).json({mssg:"SelectWhere failed", error});
                     }
                     else{
                        if(data.length > 0){
                           console.log(`data ln187: ${JSON.stringify(data)}`)
                           const calories = data[0].calories;
                           const duration = data[0].duration;
                           const distance = data[0].distance;
                           console.log(`calories:${calories}`);
                           console.log(`duration: ${duration}`);
                           console.log(`distance:${distance}`)
                           arrayOfCalories.push(calories);
                           arrayOfDuration.push(duration);
                           arrayOfDistance.push(distance)
                          
                           console.log(`arrayOfCalories:${arrayOfCalories}`)
                           console.log(`arrayOfDates: ${transformedArray}`)
                           console.log(`arrayOfDuration:${arrayOfDuration}`)
                           console.log(`arrayOfDistance:${arrayOfDistance}`)

                        }
                        else{
                           return res.status(400).json({mssg:"Not in table failed"});
                        }
                       
                     }
                   }
               }
            }
            else{
               //Replace to return 2 empty arrays
               return res.status(400).json({mssg:"Exercise has never been performed"});
            }
         }
        if(typeOfExercise === "Weight"){
         return res.status(200).json({mssg:"Success!", arrayOfDates,arrayOfWeightPulled });
        }
        else{
         return res.status(200).json({mssg:"Success!", arrayOfDates,arrayOfCalories, arrayOfDistance, arrayOfDuration });
        }
        
     }

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
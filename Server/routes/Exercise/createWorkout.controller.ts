import { Request, Response } from "express";
import supabase from "../../utils/supabaseSetUp";
import { SupbaseQueryClass } from "../../utils/databaseInterface";
import { eitherIsFloatOrInt, covertStringToNumber } from "../../utils/validators";
import { type } from "os";
const databaseQuery = new SupbaseQueryClass();



const deleteWorkoutPlansWithExercisesByID =async (workoutPlanID:string) => {
    const errorAndIDs = {errorPresent: ''};
  const {error}:any = await databaseQuery.deleteFrom(supabase, 'WorkoutPlansWithExercises','WorkoutPlanID', workoutPlanID)
  if(error){
    errorAndIDs.errorPresent = error;
    return errorAndIDs;
  }
  return errorAndIDs
}


const deleteWorkoutPlanByID =async (workoutPlanID:string) => {
    const errorAndIDs = {deleteError: ''};
  const {error}:any = await databaseQuery.deleteFrom(supabase, 'WorkoutPlans','WorkoutPlanID', workoutPlanID)
  if(error){
    errorAndIDs.deleteError = error;
    return errorAndIDs;
  }
  return errorAndIDs
}


export const deleteWorkoutPlan =async (req:Request, res: Response) => {
    const {userid, workoutname} = req.body;
    if(!userid || !workoutname){
        return res.status(400).json({mssg:"Either userid or workoutname is missing!"})
    }

   const {data, error}:any = await databaseQuery.match(supabase, 'WorkoutPlans','WorkoutPlanID', {userid, workoutname});
   if(error){
        return res.status(400).json({mssg:error})
   }
   if(data.length===0){
        return res.status(400).json({mssg:"User does not have a plan of that name!"})
   }
   const workoutPlanToDel = data[0].WorkoutPlanID
//    const {errorPresent} = await deleteWorkoutPlansWithExercisesByID(workoutPlanToDel);
//    if(errorPresent){
//     return res.status(400).json({mssg:"Fail to delete WorkoutPlanByID", errorPresent})
//    }

   const {deleteError} = await deleteWorkoutPlanByID(workoutPlanToDel)
   if(deleteError){
    return res.status(400).json({mssg:"Fail to delete WorkoutPlanByID", deleteError})
   }
   else{
    return res.status(200).json({mssg:`Workout Plan ${workoutname} Deleted!`})
   }

}
/**
 * 
 * Get getexerciseid of a single exercise, if not in the exercise table already- add it
 */
export const addExerciseToExercises = async(type:string,name:string,muscle:string, difficulty:string, instructions:string, equipment:string) =>{

   const errorAndIDs = {errorPresent: '', ID:""};
   //Allow instructions to be the empty string
    if(!type||!name||!muscle||! difficulty||! equipment){
       errorAndIDs.errorPresent = "One of type, name, muscle, difficulty or equipment are empty!"
       return errorAndIDs;
    }
    else{
        const {data, error}: any= await databaseQuery.selectWhere(supabase, 'Exercises', 'name', name, '*'); 
        
        if(error){
            console.log("Error selecting from Exercises table!")
            errorAndIDs.errorPresent = error
            return errorAndIDs;
        }
        console.log(`selectWhere data: ${JSON.stringify(data)}`);
         if(data.length == 0){
            console.log(`data.length == 0!`)
            const {data, error}: any =  await databaseQuery.insert(supabase, 'Exercises', {type,name, muscle, difficulty, instructions, equipment})
            if(error){
                console.log(`Error inserting into Exercises table!`)
                errorAndIDs.errorPresent = error
                return errorAndIDs;
            }
            else {
                const exerciseID = data[0].ExerciseID
                console.log(`exerciseID: ${exerciseID}`)
                console.log(`Exercise has been successfully added!`)
                errorAndIDs.ID = exerciseID;
                return errorAndIDs;
            }

        }
        else{
            const exerciseID = data[0].ExerciseID 
            console.log(`exerciseID: ${exerciseID}`)
            console.log("Exercise is already in the Exercises table!")
            errorAndIDs.ID = exerciseID;
            return errorAndIDs;
        }
    }
} 
/**
 * Creates a WorkoutPlan, adds each exercise to PossibleExercises and adds
 * multiple records to WorkoutPlansWithExercises
 * 
 * exercises should be an array of objects containing userid and other properties specific to an exercise
 */

//Array of objects where each exercise will have the properties type,name,muscle, difficulty, instructions, equipment,
//and sets, reps, possible exercise data.
//Workoutname
//Empty string
export const createWorkout =async (req:Request, res: Response) => {
   const {userid, workoutname, exercises} = req.body;

   if(!userid||!workoutname||!exercises){
    return res.status(400).json({mssg: "userid, workoutname or exercises is missing!"})
   }
   console.log(`ln122 req.body: ${JSON.stringify(req.body)}`);
   
   //Add the exerciseID and userid of the exercise to each exercise object's property
   for(let i = 0; i< exercises.length; i++){
    try{
     const {type, name, muscle, difficulty, instructions, equipment }= exercises[i];
    //  const propertiesOfExercise= Object.keys(exercises[i]);
    //  for(let k = 0; k<propertiesOfExercise.length; k++){
    
    //  }
     //check if exercises has all of the destructured properties above and make sure name is not the empty string   
     const necessaryProperties = ["type", "name","muscle", "difficulty", "equipment","instructions"]
    for(let j = 0; j<necessaryProperties.length; j++){
        console.log(`${necessaryProperties[j]}:${exercises[i].hasOwnProperty(necessaryProperties[j])} }`)
    }
     if(!exercises[i].hasOwnProperty("type")||!exercises[i].hasOwnProperty("name")||!exercises[i].hasOwnProperty("muscle")||!exercises[i].hasOwnProperty("difficulty")||!exercises[i].hasOwnProperty("equipment")||!exercises[i].hasOwnProperty("instructions")){
        return res.status(400).json({mssg:"Exercise doesn't have one of the following properties:type, name, muscle, difficulty, equipment"})
     }
     console.log(`exercises[i] before delete for: ${JSON.stringify(exercises[i])}`)

     Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k]);
     console.log(`exercises[i] after delete for:  ${JSON.stringify(exercises[i])}`)
     const {errorPresent, ID} = await addExerciseToExercises(type, name, muscle, difficulty, instructions, equipment);
     if(errorPresent){
        console.log(`errorPresent: ${errorPresent}`)
        return res.status(400).json({mssg:errorPresent, error:"error"})
     }
     else{
        exercises[i].exerciseID = ID;
        exercises[i].userID = userid;
        delete exercises[i].type
        delete exercises[i].name
        delete exercises[i].muscle
        delete exercises[i].difficulty
        delete exercises[i].instructions
        delete exercises[i].equipment
     }
    }
    catch(error){
        console.error(`error here: ${error}`)
        return res.status(400).json({mssg:"Failure", error})
    }
   }

   console.log(`exercises after mod: ${JSON.stringify(exercises)}`)
   

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
             //Check if exercises inputs are numbers!
            if(exercises[i].calories && typeof(exercises[i].calories) ==='string'&&!(eitherIsFloatOrInt(exercises[i].calories))){
                return res.status(400).json({mssg: "Make sure calories is a number!"})
            }

            if(exercises[i].sets && typeof(exercises[i].sets) ==='string'&&!(eitherIsFloatOrInt(exercises[i].sets))){
                return res.status(400).json({mssg: "Make sure sets is a number!"})
            }
            if(exercises[i].reps &&typeof(exercises[i].reps) ==='string'&& !(eitherIsFloatOrInt(exercises[i].reps))){
                return res.status(400).json({mssg: "Make sure reps is a number!"})
            }
            if(exercises[i].weight && typeof(exercises[i].weight) ==='string'&&!(eitherIsFloatOrInt(exercises[i].weight))){
                return res.status(400).json({mssg: "Make sure weight is a number!"})
            }
            if(exercises[i].distance && typeof(exercises[i].distance) ==='string'&&!(eitherIsFloatOrInt(exercises[i].distance))){
                return res.status(400).json({mssg: "Make sure distance is a number!"})
            }
            if(exercises[i].duration &&typeof(exercises[i].duration) ==='string'&& !(eitherIsFloatOrInt(exercises[i].duration))){
                    return res.status(400).json({mssg: "Make sure duration is a number!"})
            }
            //Check if exercises inputs are numbers!
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
               console.log(`exercises[i]: ${exercises[i]}`)
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
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

        for(let i = 0; i< data.length;i++){
          let timestamp = data[i].timestamp;
          delete data[i].timestamp;
          data[i].date = getDate(timestamp);
          data[i].time = getTime(timestamp);
        }
        console.log(`After mod completedWorkouts: ${JSON.stringify(data)}`);
        const workoutsNamesAndDates = data;
        return res.status(200).json({mssg:"Got All Completed Workouts!",workoutsNamesAndDates})
    }
}



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

export const addCompletedWorkouts =async (req:Request, res: Response) => {
    
    const {userid, workoutname, exercises} = req.body;

    if(!userid||!workoutname||!exercises){
     return res.status(400).json({mssg: "userid, workoutname or exercises is missing!"})
    }

    for(let i = 0; i< exercises.length; i++){
        try{
         const {type, name, muscle, difficulty, instructions, equipment }= exercises[i];
         const propertiesOfExercise= Object.keys(exercises[i]);
         for(let k = 0; k<propertiesOfExercise.length; k++){
        
         }
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
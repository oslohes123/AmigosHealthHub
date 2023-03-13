require('dotenv').config()
import { Request, Response } from 'express';
const EXERCISE_API_KEY = process.env.EXERCISE_API_KEY as string;
import supabase from '../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../utils/databaseInterface';
import removeDuplicates from '../../utils/removeDuplicates';
const databaseQuery = new supabaseQueryClass();
/**
 * Given a name, return all exercise matches from the fitness API
 */
export const searchForExercise = async(req: Request, res: Response) => {
    const {wordtosearch} = req.headers;
    console.log(`wordtosearch: ${wordtosearch}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`)
    if(!wordtosearch){
        return res.status(200).json({mssg:"wordtosearch is empty", searchedWords: []})
    }
    try{
        const nameFitnessURL = 'https://api.api-ninjas.com/v1/exercises?name=' + wordtosearch
        console.log(`nameFitnessURL: ${nameFitnessURL}`)
        const response = await fetch(
            nameFitnessURL,
            {
            method: "GET",
            headers: {'X-Api-Key': EXERCISE_API_KEY},
            }
        );
    
        const arrayOfExercises = await response.json();
        console.log(`arrayOfExercises: ${JSON.stringify(arrayOfExercises)}`)
        let arrayOfExerciseNames = [];
        for(let i = 0; i < arrayOfExercises.length;i++){
            arrayOfExerciseNames.push(arrayOfExercises[i].name)
        }

         arrayOfExerciseNames = removeDuplicates(arrayOfExerciseNames)
         console.log(`arrayOfExerciseNames: ${arrayOfExerciseNames}`)
        if(response.ok){
            res.status(200).json({mssg:"Successful Search!", searchedWords: arrayOfExerciseNames})
        }
        else{
            res.status(400).json({mssg:"Fetching fitness api went wrong!"})
        }
    }
    catch(error){
        res.status(400).json({mssg:"Fetching fitness api went wrong!"})
    }
    
}


/**
 * Given a name of an exercise, have the API return the details of the closest match
 */
export const getExerciseByName =async (req:Request, res: Response) => {
    const {exercisename} = req.headers;
    console.log(`exercisename: ${exercisename}`);
    console.log(`req.headers: ${JSON.stringify(req.headers)}`)
    if(!exercisename){
        return res.status(400).json({mssg:"exercisename is empty"})
    }
    try{
        const nameFitnessURL = 'https://api.api-ninjas.com/v1/exercises?name=' + exercisename
        console.log(`nameFitnessURL: ${nameFitnessURL}`)
        const response = await fetch(
            nameFitnessURL,
            {
            method: "GET",
            headers: {'X-Api-Key': EXERCISE_API_KEY},
            }
        );
    
        const exerciseInformation = await response.json();
        
        if(response.ok){
            console.log(`exerciseInformation: ${JSON.stringify(exerciseInformation)}`)
            if(exerciseInformation.length > 0){
                res.status(200).json({mssg:"Exercise Matched!", exerciseInformation: exerciseInformation[0]})
            }
            else{
                res.status(400).json({mssg:"No exercise of that name was found!"})
            }
        }
        else{
            res.status(400).json({mssg:"Fetching fitness api went wrong!"})
        }
    }
    catch(error){
        res.status(400).json({mssg:"Fetching fitness api went wrong!"})
    }

}
/**
 * If an exercise is not already in the Exercises table, then add it and return exerciseID
 * If an exericse is already in the Exercise table, then return exerciseID
 */

//Array of objects where each exercise will have the properties type,name,muscle, difficulty, instructions, equipment,
//and sets, reps, possible exercise data.
//Workoutname
//Empty string

export const addExerciseToExercises = async(req: Request, res: Response) =>{

    const {type,name,muscle, difficulty, instructions, equipment } = req.body

    if(!type||!name||!muscle||! difficulty||!instructions||! equipment){
        return res.status(400).json({mssg:"One of type,name,muscle, difficulty, instructions, equipment is missing!"})
    }


    //if that exercise name doesn't exist, then attempt to add it
    const {data, error}: any= await databaseQuery.selectWhere(supabase, 'Exercises', 'name', name, '*'); 
     
    if(error){
        console.log("Error selecting from Exercises table!")
        return res.status(400).json({mssg:"Error selecting from Exercises table!"});
    }
    if(data.length == 0){
        const {data, error}: any =  await databaseQuery.insert(supabase, 'Exercises', {type,name, muscle, difficulty, instructions, equipment})
        if(error){
            console.log(`Error inserting into Exercises table!`)
            return res.status(400).json({mssg:"Error inserting into Exercises table!"})
        }
        else {
            const exerciseID = data[0].ExerciseID
            console.log(`exerciseID: ${exerciseID}`)
            console.log(`Exercise has been successfully added!`)
            return res.status(200).json({mssg:"Exercise has been successfully added", exerciseID})
        }

    }
    else{
        const exerciseID = data[0].ExerciseID 
        console.log(`exerciseID: ${exerciseID}`)
        console.log("Exercise is already in the Exercises table!")
        return res.status(200).json({mssg:"Exercise is already in the Exercises table!", exerciseID})
    }
} 
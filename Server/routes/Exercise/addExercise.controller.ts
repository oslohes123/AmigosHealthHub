import { type Request, type Response } from 'express'
import { removeDuplicates } from '../../utils/arrayManipulation'
require('dotenv').config()
const EXERCISE_API_KEY = process.env.EXERCISE_API_KEY as string
/**
 * Given a name, return all exercise matches from the fitness API
 */
export const searchForExercise = async (req: Request, res: Response) => {
  const { wordtosearch } = req.headers
  if (!wordtosearch) {
    return res.status(200).json({ mssg: 'wordtosearch is empty', searchedWords: [] })
  }
  try {
    const nameFitnessURL = 'https://api.api-ninjas.com/v1/exercises?name=' + String(wordtosearch)
    console.log(`nameFitnessURL: ${nameFitnessURL}`)
    const response = await fetch(
      nameFitnessURL,
      {
        method: 'GET',
        headers: { 'X-Api-Key': EXERCISE_API_KEY }
      }
    )

    const arrayOfExercises = await response.json()
    console.log(`arrayOfExercises: ${JSON.stringify(arrayOfExercises)}`)
    let arrayOfExerciseNames = []
    for (let i = 0; i < arrayOfExercises.length; i++) {
      arrayOfExerciseNames.push(arrayOfExercises[i].name)
    }

    arrayOfExerciseNames = removeDuplicates(arrayOfExerciseNames)
    if (response.ok) {
      return res.status(200).json({ mssg: 'Successful Search!', searchedWords: arrayOfExerciseNames })
    }
    else {
      return res.status(400).json({ mssg: 'Fetching fitness api went wrong!' })
    }
  }
  catch (error) {
    return res.status(400).json({ mssg: 'Fetching fitness api went wrong!' })
  }
}

/**
 * Given a name of an exercise, have the API return the details of the closest match
 */
export const getExerciseByName = async (req: Request, res: Response) => {
  const { exercisename } = req.headers
  if (!exercisename) {
    return res.status(400).json({ mssg: 'exercisename is empty' })
  }
  try {
    const nameFitnessURL = 'https://api.api-ninjas.com/v1/exercises?name=' + String(exercisename)
    console.log(`nameFitnessURL: ${nameFitnessURL}`)
    const response = await fetch(
      nameFitnessURL,
      {
        method: 'GET',
        headers: { 'X-Api-Key': EXERCISE_API_KEY }
      }
    )

    const exerciseInformation = await response.json()

    if (response.ok) {
      console.log(`exerciseInformation: ${JSON.stringify(exerciseInformation)}`)
      if (exerciseInformation.length > 0) {
        return res.status(200).json({ mssg: 'Exercise Matched!', exerciseInformation: exerciseInformation[0] })
      }
      else {
        return res.status(400).json({ mssg: 'No exercise of that name was found!' })
      }
    }
    else {
      return res.status(400).json({ mssg: 'Fetching fitness api went wrong!' })
    }
  }
  catch (error) {
    return res.status(400).json({ mssg: 'Fetching fitness api went wrong!' })
  }
}

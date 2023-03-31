import { type Request, type Response } from 'express'
import { removeDuplicates } from '../../utils/General/arrayManipulation'
import searchAPIForExercise from '../../utils/Exercise/fetchExerciseAPI'
/**
 * Given a name, return all exercise matches from the fitness API
 */
export const searchForExercise = async (req: Request, res: Response) => {
  const { wordtosearch } = req.headers
  if (!wordtosearch) {
    // searching no word
    return res.status(200).json({ mssg: 'wordtosearch is empty', searchedWords: [] })
  }
  try {
    const response = await searchAPIForExercise(wordtosearch)

    if (!response.ok) {
      return res.status(400).json({ mssg: 'Fetching fitness api went wrong!' })
    }
    else {
      const arrayOfExercises = await response.json()
      let arrayOfExerciseNames = []
      for (let i = 0; i < arrayOfExercises.length; i++) {
        arrayOfExerciseNames.push(arrayOfExercises[i].name)
      }

      arrayOfExerciseNames = removeDuplicates(arrayOfExerciseNames)
      return res.status(200).json({ mssg: 'Successful Search!', searchedWords: arrayOfExerciseNames })
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
    return res.status(400).json({ mssg: 'Something went wrong', dev: 'JSON instance does not follow JSON schema' })
  }
  try {
    const response = await searchAPIForExercise(exercisename)
    const exerciseInformation = await response.json()

    if (response.ok) {
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

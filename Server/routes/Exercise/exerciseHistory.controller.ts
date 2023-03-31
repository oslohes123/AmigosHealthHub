import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { removeDuplicates } from '../../utils/arrayManipulation'
import { getDate } from '../../utils/convertTimeStamptz'
import validateJSONSchema from '../../utils/validateJSONSchema'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
import { matchExercise } from '../../utils/Exercise/exerciseFunctions'
const databaseQuery = new SupabaseQueryClass()

export const getExerciseHistory = async (req: Request, res: Response) => {
  const { nameofexercise, userid } = req.headers
  if (!nameofexercise || !userid) {
    return res.status(400).json({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' })
  }

  const arrayOfWeightPulled = []
  let arrayOfDates = []
  const arrayOfCalories = []
  const arrayOfDuration = []
  const arrayOfDistance = []
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'name', nameofexercise, 'ExerciseID, type')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong', error })
  }

  else {
    const exerciseID = data[0].ExerciseID
    const typeOfExercise = data[0].type
    const { errorPresent, exercisesMatch } = await matchExercise(userid, exerciseID)
    if (errorPresent) {
      return res.status(400).json({ mssg: 'Something went wrong', errorPresent })
    }
    else {
      if (exercisesMatch.length > 0) {
        if (typeOfExercise === 'muscle' || typeOfExercise === 'strength') {
          const arrayOfCompletedWorkoutIDs = []
          const arrayOfAEIDs = []
          for (let i = 0; i < exercisesMatch.length; i++) {
            const AEID = exercisesMatch[i].AEID
            arrayOfAEIDs.push(AEID)
            const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'AEID', AEID, '*')
            if (error) {
              return res.status(400).json({ mssg: 'Sorry, something went wrong!' })
            }

            if (data.length > 0) {
              arrayOfCompletedWorkoutIDs.push(data[0].completedWorkoutID)
            }
            else {
              return res.status(400).json({ mssg: 'Exercise has never been performed' })
            }
          }

          for (let j = 0; j < arrayOfCompletedWorkoutIDs.length; j++) {
            const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'timestamp', { userid, completedWorkoutID: arrayOfCompletedWorkoutIDs[j] })
            if (error) {
              return res.status(400).json({ mssg: 'Failure Matching', error })
            }
            else {
              if (data.length > 0) {
                arrayOfDates.push(data[0].timestamp)
              }
              else {
                return res.status(400).json({ mssg: 'Data.length ==0 for timestamp', error })
              }
            }
          }

          //  const transformedArray = arrayOfDates.map((x) => [getDate(x), getTime(x)])

          for (let i = 0; i < arrayOfAEIDs.length; i++) {
            const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID', arrayOfAEIDs[i], 'reps, weight, sets')
            if (error) {
              return res.status(400).json({ mssg: 'SelectWhere failed', error })
            }
            else {
              if (data.length > 0) {
                const numberOfSets = data[0].sets
                const reps = data[0].reps
                const weight = data[0].weight
                if (reps && reps.length === numberOfSets && weight.length === numberOfSets) {
                  let weightPulled: number = 0
                  for (let j = 0; j < numberOfSets; j++) {
                    weightPulled = weightPulled + (reps[j] * weight[j])
                  }
                  arrayOfWeightPulled.push(weightPulled)
                }
              }
              else {
                return res.status(400).json({ mssg: 'Not in table failed' })
              }
            }
          }
        }

        else {
          const arrayOfCompletedWorkoutIDs = []
          const arrayOfAEIDs = []
          for (let i = 0; i < exercisesMatch.length; i++) {
            const AEID = exercisesMatch[i].AEID
            arrayOfAEIDs.push(AEID)
            const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'AEID', AEID, '*')
            if (error) {
              return res.status(400).json({ mssg: 'Sorry, something went wrong!' })
            }
            if (data.length > 0) {
              arrayOfCompletedWorkoutIDs.push(data[0].completedWorkoutID)
            }
            else {
              return res.status(400).json({ mssg: 'Exercise has never been performed' })
            }
          }

          for (let j = 0; j < arrayOfCompletedWorkoutIDs.length; j++) {
            const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'timestamp', { userid, completedWorkoutID: arrayOfCompletedWorkoutIDs[j] })
            if (error) {
              return res.status(400).json({ mssg: 'Failure Matching', error })
            }
            else {
              if (data.length > 0) {
                arrayOfDates.push(data[0].timestamp)
              }
              else {
                return res.status(400).json({ mssg: 'Data.length ==0 for timestamp', error })
              }
            }
          }

          for (let i = 0; i < arrayOfAEIDs.length; i++) {
            const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID', arrayOfAEIDs[i], 'calories, duration, distance')
            if (error) {
              return res.status(400).json({ mssg: 'SelectWhere failed', error })
            }
            else {
              if (data.length > 0) {
                const calories = data[0].calories
                const duration = data[0].duration
                const distance = data[0].distance
                arrayOfCalories.push(calories)
                arrayOfDuration.push(duration)
                arrayOfDistance.push(distance)
              }
              else {
                return res.status(400).json({ mssg: 'Not in table failed' })
              }
            }
          }
        }
      }
      else {
        return res.status(400).json({ mssg: 'Exercise has never been performed' })
      }
    }
    arrayOfDates = arrayOfDates.map((x) => [getDate(x)])
    if (typeOfExercise === 'muscle' || typeOfExercise === 'strength') {
      return res.status(200).json({ mssg: 'Success!', type: 'muscle/strength', arrayOfDates, data: { arrayOfWeightPulled } })
    }
    else {
      return res.status(200).json({ mssg: 'Success!', type: 'Other', arrayOfDates, data: { arrayOfCalories, arrayOfDistance, arrayOfDuration } })
    }
  }
}

// Gets all exercise names a user has performed
export const getAllExercises = async (req: Request, res: Response) => {
  const { userid } = req.headers

  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'userID', userid, 'exerciseID')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong', error })
  }

  let arrayOfExerciseIDs = []
  for (let i = 0; i < data.length; i++) {
    arrayOfExerciseIDs.push(data[i].exerciseID)
  }
  arrayOfExerciseIDs = removeDuplicates(arrayOfExerciseIDs)

  for (let i = 0; i < arrayOfExerciseIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfExerciseIDs[i], 'name')
    if (error) {
      return res.status(400).json({ mssg: 'Something went wrong', error })
    }
    arrayOfExerciseIDs[i] = data[0].name
  }
  const arrayOfExerciseNames = arrayOfExerciseIDs
  return res.status(200).json({ mssg: 'Success!', arrayOfExerciseNames })
}

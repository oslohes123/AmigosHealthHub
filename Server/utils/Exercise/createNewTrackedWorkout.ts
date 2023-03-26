import { searchExerciseInExercises } from '../../routes/Exercise/completedWorkouts.controller'
import validateJSONSchema from '../validateJSONSchema'
import supabase from '../supabaseSetUp'
import { SupabaseQueryClass } from '../databaseInterface'
import { schemaForExercisesInNewCompletedWorkout } from '../JSONSchemas/schemaForExercisesInNewCompletedWorkout'
import { getTimeStamp } from '../convertTimeStamptz'
const databaseQuery = new SupabaseQueryClass()
export const addCompletedWorkoutUnit = async (userid: string, workoutname: string, exercises: any, timestamp: string = getTimeStamp()) => {
  const errorAddCompletedWorkoutsAndSuccess = { errorAddCompletedWorkouts: '', success: false }

  if (!validateJSONSchema(exercises, schemaForExercisesInNewCompletedWorkout)) {
    errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = 'Validation of schema failed'
    return errorAddCompletedWorkoutsAndSuccess
  }
  exercises = exercises.exercises
  for (let i = 0; i < exercises.length; i++) {
    try {
      const { name } = exercises[i]

      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k])
      const { errorPresent, ID } = await searchExerciseInExercises(name)
      if (errorPresent) {
        errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = errorPresent
        return errorAddCompletedWorkoutsAndSuccess
      }
      else {
        exercises[i].exerciseID = ID
        exercises[i].userID = userid
        delete exercises[i].type
        delete exercises[i].name
        delete exercises[i].muscle
        delete exercises[i].difficulty
        delete exercises[i].instructions
        delete exercises[i].equipment
      }
    }
    catch (error) {
      errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = JSON.stringify(error)
      return errorAddCompletedWorkoutsAndSuccess
    }
  }

  // 1. Create a record in completed workouts
  const { data, error }: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', { userid, workoutname, timestamp })
  if (error) {
    errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = JSON.stringify(error)
    return errorAddCompletedWorkoutsAndSuccess
  }
  const completedWorkoutID = data[0].completedWorkoutID
  // 2. Add each exercise in exercises to actual exercise
  const numberOfExercises = exercises.length
  const arrayOfAEIDs = []
  for (let i = 0; i < numberOfExercises; i++) {
    const { data, error }: any = await databaseQuery.insert(supabase, 'ActualExercises', exercises[i])

    if (error) {
      errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = JSON.stringify(error)
      return errorAddCompletedWorkoutsAndSuccess
    }
    arrayOfAEIDs.push(data[0].AEID)
    // possible exercise already exists
  }
  // 3.  Create a record in TrackedWorkoutsWithExercises for each exercise in the workoutplan.
  for (let i = 0; i < arrayOfAEIDs.length; i++) {
    console.log('Record in TrackedWorkoutsWithExercises Executed!')
    const { error }: any = await databaseQuery.insert(supabase, 'TrackedWorkoutsWithExercises', { completedWorkoutID, AEID: arrayOfAEIDs[i] })
    if (error) {
      errorAddCompletedWorkoutsAndSuccess.errorAddCompletedWorkouts = JSON.stringify(error)
      return errorAddCompletedWorkoutsAndSuccess
    }
  }
  errorAddCompletedWorkoutsAndSuccess.success = true
  return errorAddCompletedWorkoutsAndSuccess
}

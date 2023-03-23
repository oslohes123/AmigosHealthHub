import supabase from './supabaseSetUp'
import { SupabaseQueryClass } from './databaseInterface'
const databaseQuery = new SupabaseQueryClass()

export async function deleteAllWorkoutPlansWithExercises (userID: string) {
  const deleteError = { errorPresent: null }
  const { errorWorkoutPlanIDs, workoutPlanIDs }: any = await getAllWorkoutPlanIDs(userID)
  if (errorWorkoutPlanIDs) {
    deleteError.errorPresent = errorWorkoutPlanIDs
    return deleteError
  }
  else {
    for (let i = 0; i < workoutPlanIDs.length; i++) {
      const { error }: any = await databaseQuery.deleteFrom(supabase, 'WorkoutPlansWithExercises', 'WorkoutPlanID', workoutPlanIDs[i])
      if (error) {
        deleteError.errorPresent = error
        return deleteError
      }
    }
  }

  return deleteError
}

export async function getAllWorkoutPlanIDs (userID: string) {
  const workoutPlanIDsAndError = { errorWorkoutPlanIDs: null, workoutPlanIDs: [''] }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'WorkoutPlans', 'userid', userID, 'WorkoutPlanID')
  if (error) {
    workoutPlanIDsAndError.errorWorkoutPlanIDs = error
    return workoutPlanIDsAndError
  }
  else if (data.length === 0) {
    return workoutPlanIDsAndError
  }
  else {
    const arrayOfWorkoutPlanIDs = []
    for (let i = 0; i < data.length; i++) {
      arrayOfWorkoutPlanIDs.push(data[i].WorkoutPlanID)
    }
    workoutPlanIDsAndError.workoutPlanIDs = arrayOfWorkoutPlanIDs
    console.log(`arrayOfWorkoutPlanIDs: ${JSON.stringify(arrayOfWorkoutPlanIDs)}`)
    return workoutPlanIDsAndError
  }
}

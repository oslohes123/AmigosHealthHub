import supabase from '../supabaseSetUp'
import { SupabaseQueryClass } from '../databaseInterface'
const databaseQuery = new SupabaseQueryClass()

export async function insertCompletedWorkoutRow (id: string, workoutname: string, timestamp: string, table = 'CompletedWorkouts', database = supabase) {
  const { data, error }: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', { userid: id, workoutname, timestamp })
  return { dataInsertCompletedWorkoutRow: data, errorInsertCompletedWorkoutRow: error }
}

export async function selectAllCompletedWorkoutNames (userid: string, table = 'CompletedWorkouts', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'userid', userid, 'completedWorkoutID, workoutname')
  return { dataSelectAllCompletedWorkoutNames: data, errorSelectAllCompletedWorkoutNames: error }
}

export async function selectAllTrackedWorkoutsWithExercises (workoutPlanID: string, table = 'TrackedWorkoutsWithExercises', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'completedWorkoutID', workoutPlanID, 'id')
  return { dataSelectAllTrackedWorkoutsWithExercises: data, errorSelectAllTrackedWorkoutsWithExercises: error }
}

export async function selectAllActualExercises (userid: string, table = 'ActualExercises', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'userID', userid, 'AEID')
  return { dataSelectAllActualExercises: data, errorSelectAllActualExercises: error }
}

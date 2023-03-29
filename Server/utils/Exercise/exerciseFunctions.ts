import supabase from '../supabaseSetUp'
import { SupabaseQueryClass } from '../databaseInterface'
const databaseQuery = new SupabaseQueryClass()

export default async function insertCompletedWorkoutRow (id: string, workoutname: string, timestamp: string, table = 'CompletedWorkouts', database = supabase) {
  const { data, error }: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', { userid: id, workoutname, timestamp })
  return { dataInsertCompletedWorkoutRow: data, errorInsertCompletedWorkoutRow: error }
}

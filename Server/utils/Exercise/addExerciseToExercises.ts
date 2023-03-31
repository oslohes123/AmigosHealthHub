import supabase from '../supabaseSetUp'
import { SupabaseQueryClass } from '../databaseInterface'
const databaseQuery = new SupabaseQueryClass()
/**
 *
 * Get getexerciseid of a single exercise, if not in the exercise table already- add it
 */
export default async function addExerciseToExercises (type: string, name: string, muscle: string, difficulty: string, instructions: string, equipment: string) {
  const errorAndIDs = { errorPresent: '', ID: '' }
  // Allow instructions to be the empty string
  if (!type || !name || !muscle || !difficulty || !equipment) {
    errorAndIDs.errorPresent = 'One of type, name, muscle, difficulty or equipment are empty!'
    return errorAndIDs
  }
  else {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'name', name, '*')

    if (error) {
      errorAndIDs.errorPresent = error
      return errorAndIDs
    }
    if (data.length === 0) {
      const { data, error }: any = await databaseQuery.insert(supabase, 'Exercises', { type, name, muscle, difficulty, instructions, equipment })
      if (error) {
        errorAndIDs.errorPresent = JSON.stringify(error)
        return errorAndIDs
      }
      else {
        const exerciseID = data[0].ExerciseID
        errorAndIDs.ID = exerciseID
        return errorAndIDs
      }
    }
    else {
      const exerciseID = data[0].ExerciseID

      errorAndIDs.ID = exerciseID
      return errorAndIDs
    }
  }
}

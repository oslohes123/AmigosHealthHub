import { SupabaseQueryClass } from '../General/databaseInterface'
import supabase from '../General/supabaseSetUp'
require('dotenv').config()
const databaseQuery = new SupabaseQueryClass()

/**
 * Insert a new calorie goal
 * @param UserID
 * @param CalorieGoal
 * @returns Error or success message
 */
export const createCalorieGoal = async (UserID: string, CalorieGoal: number) => {
  const { data, error }: any = await databaseQuery.insert(
    supabase,
    'Calories',
    {
      UserID,
      Date: new Date().toISOString().split('T')[0],
      CalorieGoal
    }
  )
  if (error) {
    return { error }
  } else {
    return { data }
  }
}

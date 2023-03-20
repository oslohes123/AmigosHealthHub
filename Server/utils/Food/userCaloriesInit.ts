import { SupabaseQueryClass } from '../../utils/databaseInterface'
import supabase from '../../utils/supabaseSetUp'
require('dotenv').config()
const databaseQuery = new SupabaseQueryClass()

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
    console.log('Error inserting')

    console.log('Error: ', error)
    return { error }
  } else {
    console.log('calorie goal inserted')
    return { data }
  }
}

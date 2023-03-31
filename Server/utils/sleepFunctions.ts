import { SupabaseQueryClass } from './databaseInterface'
import supabase from '../utils/supabaseSetUp'
const databaseQuery = new SupabaseQueryClass()

export const addSleepFunc = async (
  sleepData: object,
  database = supabase,
  table = 'Sleep Data'
) => {
  const { data, error }: any = await databaseQuery.insert(
    database,
    table,
    sleepData
  )
  return { dataAddSleep: data, errorAddSleep: error }
}

export const getSleepFunc = async (
  userID: string,
  startDate: string,
  endDate: string,
  database = supabase,
  table = 'Sleep Data'
) => {
  const columnSelected = '*'
  const { data, error }: any = await databaseQuery.selectWhereRange(
    database,
    table,
    columnSelected,
    'userID',
    userID,
    startDate,
    endDate,
    'timestamp'
  )
  return { dataGetSleep: data, errorGetSleep: error }
}

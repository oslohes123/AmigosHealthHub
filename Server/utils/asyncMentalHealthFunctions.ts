import supabase from './supabaseSetUp'
import { SupbaseQueryClass } from './databaseInterface'
const databaseQuery = new SupbaseQueryClass()

export const returnLastSeven = async (
  database = supabase,
  table = 'Mental Health',
  firstcolumn: string,
  secondcolumn = 'created_at',
  id: string | string[] | undefined
) => {
  const { data, error }: any = await databaseQuery.mostrecent(
    database,
    table,
    firstcolumn,
    secondcolumn,
    id
  )
  return { data, error }
}

export const returnTodaysWord = async (
  database = supabase,
  table = 'Mental Health',
  firstcolumn = 'user_id',
  secondcolumn = 'created_at',
  toBeFoundFirst: string | string[] | undefined,
  toBeFoundSecond: string,
  toBeSelected: string
) => {
  const { data, error }: any = await databaseQuery.todays_data(
    database,
    table,
    firstcolumn,
    secondcolumn,
    toBeFoundFirst,
    toBeFoundSecond,
    toBeSelected
  )
  return { data, error }
}

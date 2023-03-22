import supabase from './supabaseSetUp'
import { SupabaseQueryClass } from './databaseInterface'
const databaseQuery = new SupabaseQueryClass()

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

// export const createUser = async (
//   informationToInsert: UserInterface,
//   database = supabase,
//   table = 'User'
// ) => {
//   const { data, error }: any = await databaseQuery.insert(
//     database,
//     table,
//     informationToInsert
//   )
//   return { data, error }
// }

export const createMentalHealthUser = async (
  informationToInsert: MentalHealthUserInterface,
  database = supabase,
  table = 'Mental Health'
)

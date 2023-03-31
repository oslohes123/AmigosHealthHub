import supabase from '../General/supabaseSetUp'
import { SupabaseQueryClass } from '../General/databaseInterface'
import type { MentalHealthUserInterface } from './MentalHealthUserInterface'
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

export const createMentalHealthUser = async (
  informationToInsert: MentalHealthUserInterface,
  database = supabase,
  table = 'Mental Health'
) => {
  const { data, error }: any = await databaseQuery.insert(
    database,
    table,
    informationToInsert
  )
  return { data, error }
}

export const updateMentalHealthData = async (
  database = supabase,
  table = 'Mental Health',
  informationToUpdate: MentalHealthUserInterface,
  mentalHealthID = 'MH_ID',
  MHID: string
) => {
  const { data, error }: any = await databaseQuery.update(
    database,
    table,
    informationToUpdate,
    mentalHealthID,
    MHID
  )
  return { data, error }
}

export const getMentalHealthUserByID = async (
  id: string,
  toBeSelected: string,
  database = supabase,
  table = 'Mental Health'
) => {
  const { data, error }: any = await databaseQuery.selectWhere(
    database,
    table,
    'id',
    id,
    toBeSelected
  )

  return { data, error }
}

export const selectCreatedByOfMentalHealthUser = async (
  database = supabase,
  table = 'Mental Health',
  id: any,
  toBeSelected: any
) => {
  const { data, error }: any = await databaseQuery.selectWhere(
    database,
    table,
    'user_id',
    id,
    'created_at'
  )
  return { data, error }
}

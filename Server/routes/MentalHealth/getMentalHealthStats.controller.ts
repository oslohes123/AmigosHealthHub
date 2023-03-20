import type { Request, Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { getWords, getFaces, getDates, average, wordFreq } from '../../utils/mentalHealthFunctions'
import { getDate, getTime } from '../../utils/convertTimeStamptz'
import moment from 'moment'
require('dotenv').config()

const supabaseQuery = new SupabaseQueryClass()
// const randomEmail = `${uuid}@gmail.com`

export const wordValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await supabaseQuery.mostrecent(supabase, 'Mental Health', 'todays_word', 'created_at', id)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 words' })
  }
  else {
    const frequency = wordFreq(getWords(data))
    return res.status(200).json({ mssg: 'MentalHealthOverview', words: Array.from(new Set(getWords(data))), freq: frequency })
  }
}
export const dateValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await supabaseQuery.mostrecent(supabase, 'Mental Health', 'created_at', 'created_at', id)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 dates' })
  }
  else {
    return res.status(200).json({ mssg: 'Retrieved dates', dates: getDates(data), success: 'successful' })
  }
}

export const faceValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await supabaseQuery.mostrecent(supabase, 'Mental Health', 'face_id', 'created_at', id)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 faces' })
  }
  else {
    const avg = average(getFaces(data))
    return res.status(200).json({ mssg: 'Retrieved faces', faces: getFaces(data), average: avg, success: 'successful' })
  }
}

export const todaysValue = async (req: Request, res: Response) => {
  const todayDate = getDate(moment().format())
  const todayTime = getTime(moment().format())
  console.log(`whatistodaysdate: ${JSON.stringify(todayDate)}`)
  console.log(`whatistodaysdate: ${JSON.stringify(todayTime)}`)
  const { id } = req.headers
  const { data, error }: any = await supabaseQuery.todays_data(supabase, 'Mental Health', 'user_id', 'created_at', id, todayDate, 'todays_word')
  console.log(`todaysdata: ${JSON.stringify(data)}`)

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!' })
  }
  else if (data.length === 0) {
    return res.status(200).json({ mssg: 'User has not inputted a word today' })
  }
  else {
    return res.status(200).json({ mssg: 'Here is todays word!', word: data })
  }
}

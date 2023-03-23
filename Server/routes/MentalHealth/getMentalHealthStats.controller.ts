import type { Request, Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { getWords, getFaces, getDates, average, wordFreq } from '../../utils/mentalHealthFunctions'
import { getDate } from '../../utils/convertTimeStamptz'
import { returnLastSeven, returnTodaysWord } from '../../utils/asyncMentalHealthFunctions'
import moment from 'moment'
require('dotenv').config()

export const wordValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'todays_word', 'created_at', id)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 words' })
  }
  else {
    const frequency = wordFreq(getWords(data))
    // return res.status(200).json({ mssg: 'MentalHealthOverview', words: Array.from(new Set(getWords(data))), freq: frequency })
    return res.status(200).json({ mssg: 'MentalHealthOverview', words: [...new Set(getWords(data))], freq: frequency })
  }
}
export const dateValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'created_at', 'created_at', id)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 dates' })
  }
  else {
    return res.status(200).json({ mssg: 'Retrieved dates', dates: getDates(data), success: 'successful' })
  }
}

export const faceValues = async (req: Request, res: Response) => {
  const { id } = req.headers
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'face_id', 'created_at', id)
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
  const { id } = req.headers
  const { data, error }: any = await returnTodaysWord(supabase, 'Mental Health', 'user_id', 'created_at', id, todayDate, 'todays_word')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!' })
  }
  else if (data.length === 0) {
    return res.status(200).json({ mssg: 'success', word: 'User has not inputted a word today' })
  }
  else {
    return res.status(200).json({ mssg: 'success', word: data })
  }
}

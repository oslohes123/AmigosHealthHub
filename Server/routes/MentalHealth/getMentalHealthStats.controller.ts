import type { Request, Response } from 'express'
import supabase from '../../utils/General/supabaseSetUp'
import { getWords, getFaces, getDates, average, wordFreq } from '../../utils/MentalHealth/mentalHealthFunctions'
import { getDate } from '../../utils/General/convertTimeStamptz'
import { returnLastSeven, returnTodaysWord } from '../../utils/MentalHealth/asyncMentalHealthFunctions'
import moment from 'moment'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
require('dotenv').config()

export const wordValues = async (req: Request, res: Response) => { // returns the last seven words inputted by a certain user
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'todays_word', 'created_at', userid)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 words' })
  }
  else {
    const frequency = wordFreq(getWords(data)) // stores the frequency of each word
    return res.status(200).json({ mssg: 'MentalHealthOverview', words: [...new Set(getWords(data))], freq: frequency })
  }
}
export const dateValues = async (req: Request, res: Response) => { // returns the last 7 dates where the user has inputted values
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'created_at', 'created_at', userid)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 dates' })
  }
  else {
    return res.status(200).json({ mssg: 'Retrieved dates', dates: getDates(data), success: 'successful' }) // getDates() changes data to dates only
  }
}

export const faceValues = async (req: Request, res: Response) => { // returns the last seven ids of the faces inputted by a certain user
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  const { data, error }: any = await returnLastSeven(supabase, 'Mental Health', 'face_id', 'created_at', userid)
  if (error) {
    return res.status(400).json({ mssg: 'Failed to retrieve last 7 faces' })
  }
  else {
    const avg = average(getFaces(data)) // stores the average of the last seven ids of the faces
    return res.status(200).json({ mssg: 'Retrieved faces', faces: getFaces(data), average: avg, success: 'successful' })
  }
}

export const todaysValue = async (req: Request, res: Response) => { // returns today's word
  const todayDate = getDate(moment().format()) // stores today's date
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  const { data, error }: any = await returnTodaysWord(supabase, 'Mental Health', 'user_id', 'created_at', userid, todayDate, 'todays_word')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!' })
  }
  else if (data.length === 0) {
    return res.status(200).json({ mssg: 'success', word: 'User has not inputted a word today' })
  }
  else {
    return res.status(200).json({ mssg: 'success', word: data[0].todays_word })
  }
}

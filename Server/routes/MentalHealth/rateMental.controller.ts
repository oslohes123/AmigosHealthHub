import supabase from '../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/General/databaseInterface'
import type { Request, Response } from 'express'
import { getTodaysDate } from '../../utils/General/convertTimeStamptz'
import { rateMentalSchema } from '../../utils/JSONSchemas/Mental Health/rateMentalHealthSchema'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
const databaseQuery = new SupabaseQueryClass()

// check if todays date is equal to the date of the most recent values provided by the user that is logged in
export async function checkExistsToday (id: string) {
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Mental Health', 'user_id', id, 'created_at')
  if (error) {
    return true
  }
  else if (data.length === 0) {
    return false
  }
  else {
    const recentValue = (data[data.length - 1].created_at)
    return !(recentValue < getTodaysDate()
    )
  }
}
// if the user has provided data already, insert in a new row in the data table, otherwise update the most recent value if the user has already submitted data
export const insertMentalData = async (req: Request, res: Response) => {
  const { face, word, userid } = req.body
  if (!validateJSONSchema(req.body, rateMentalSchema)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  if (!userid) {
    return res.status(400).json({ mssg: 'You must be logged in to submit data' })
  }
  if (word === '') {
    return res.status(400).json({ mssg: 'Can\'t submit an empty word' })
  }
  if (face < 1 || face > 5) {
    return res.status(400).json({ mssg: 'Face value must be between 1-5' })
  }
  if (await checkExistsToday(userid)) {
    const { data }: any = await databaseQuery.selectWhere(supabase, 'Mental Health', 'user_id', userid, 'MH_ID')
    const recentID = (data[data.length - 1].MH_ID)
    const { error }: any = await databaseQuery.update(supabase, 'Mental Health', {
      face_id: face,
      todays_word: word,
      created_at: getTodaysDate()

    },
    'MH_ID', recentID)
    // update word,face, where column
    if (error) {
      return res.status(400).json({ mssg: error })
    }
    return res.status(200).json({ mssg: 'Submission for today has been updated' })
  }
  else {
    const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', {
      user_id: userid,
      face_id: face,
      todays_word: word,
      created_at: getTodaysDate()

    })
    if (error) {
      return res.status(400).json({ mssg: error })
    }
    return res.status(200).json({ mssg: 'Successful Submission' })
  }
}

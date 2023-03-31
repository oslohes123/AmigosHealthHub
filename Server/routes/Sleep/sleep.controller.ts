import { type Request, type Response } from 'express'
import { addSleepFunc, getSleepFunc } from '../../utils/sleepFunctions'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import validateJSONSchema from '../../utils/validateJSONSchema'
import { addSleepSchema } from '../../utils/JSONSchemas/Sleep/addSleepSchema'
import { getSleepSchema } from '../../utils/JSONSchemas/Sleep/getSleepSchema'
const databaseQuery = new SupabaseQueryClass()

export const addSleep = async (req: Request, res: Response) => {
  const { userID, timestamp, hoursSlept, sleepQuality } = req.body

  if (!validateJSONSchema(req.body, addSleepSchema)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'addSleep req.body does not match the JSON Schema!' })
  }

  if (!userID)
  { return res.status(400).json({ mssg: 'UserID must be provided' }) }

  if (!timestamp)
  { return res.status(400).json({ mssg: 'timestamp must be provided' }) }
  if (!hoursSlept)
  { return res.status(400).json({ mssg: 'hoursSlept must be provided' }) }

  const { dataGetSleep, errorGetSleep }: any = await getSleepFunc(userID, timestamp, timestamp)
  if (errorGetSleep) return res.status(400).json({ mssg: 'Something went wrong.', dev: JSON.stringify(errorGetSleep) })

  if (dataGetSleep.length === 0) {
    const { errorAddSleep }: any = await addSleepFunc(req.body)

    if (errorAddSleep) return res.status(400).json({ mssg: 'Something went wrong.', dev: JSON.stringify(errorAddSleep) })
    else {
      return res.status(200).json({
        sleep: 'Sleep data added.'
      })
    }
  }

  const updatedSleepData = { userID, timestamp, hoursSlept, sleepid: dataGetSleep[0].sleepid, sleepQuality }

  const { error }: any = await databaseQuery.update(supabase, 'Sleep Data', updatedSleepData, 'sleepid', dataGetSleep[0].sleepid)
  if (error) return res.status(400).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })
  return res
    .status(200)
    .json({ mssg: 'Updated sleep data.' })
}

export const getSleep = async (req: Request, res: Response) => {
  const { userID, startDate, endDate } = req.body

  if (!validateJSONSchema(req.body, getSleepSchema)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' })
  }

  if (!userID) {
    return res.status(400).json({ mssg: 'UserID must be provided' })
  }
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ mssg: 'Start and end date must be provided' })
  }
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (start > end) {
    return res
      .status(400)
      .json({ mssg: 'Start date cannot be after end date' })
  }

  const { dataGetSleep, errorGetSleep }: any = await getSleepFunc(userID, startDate, endDate)
  console.log(`getSleep data is: ${JSON.stringify(dataGetSleep)}`)
  if (errorGetSleep) {
    return res.status(400).json({ mssg: 'Something went wrong.', dev: JSON.stringify(errorGetSleep) })
  } else if (dataGetSleep.length === 0) {
    return res.status(404).json({ mssg: 'Data not found!' })
  } else return res.status(200).json({ sleep: dataGetSleep })
}

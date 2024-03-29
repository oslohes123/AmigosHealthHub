import { type Request, type Response } from 'express'
import supabase from '../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/General/databaseInterface'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
import { getWorkoutPlanByID } from '../../utils/Exercise/exerciseFunctions'
const databaseQuery = new SupabaseQueryClass()

/**
 * @returns a Response object , if successful, containing a property named arrayOfAllWorkouts
 * which contains all the workout names of that user
 */
export const getAllWorkoutNames = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'WorkoutPlans', 'userid', userid, 'workoutname')
  if (error) {
    return res.status(400).json({ mssg: 'Error selecting from WorkoutPlans table', error })
  }
  else {
    const arrayOfAllWorkouts = []
    for (let i = 0; i < data.length; i++) {
      arrayOfAllWorkouts.push(data[i].workoutname)
    }
    return res.status(200).json({ mssg: 'Success!', arrayOfAllWorkouts })
  }
}

/**
 *Return a user's workout given a user id and workoutname
 */
export const getWorkoutDetails = async (req: Request, res: Response) => {
  const { userid, workoutname } = req.headers

  if (!userid || !workoutname) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', '*', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Matching WorkoutPlans went wrong!' })
  }
  if (data.length === 0) {
    return res.status(400).json({ mssg: "User doesn't have a workout of that name!" })
  }
  const workoutPlanID = data[0].WorkoutPlanID
  const { errorPresent, workoutToReturn }: any = await getWorkoutPlanByID(workoutPlanID)
  if (errorPresent) {
    return res.status(400).json({ mssg: 'getWorkoutPlanById failed!', err: errorPresent })
  }
  return res.status(200).json({ mssg: 'Success!', workoutToReturn })
}

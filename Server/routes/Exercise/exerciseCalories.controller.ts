import { type Request, type Response } from 'express'
import supabase from '../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/General/databaseInterface'
import { getDate, getTodaysDate } from '../../utils/General/convertTimeStamptz'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
const databaseQuery = new SupabaseQueryClass()

export const getCaloriesToday = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  let totalCaloriesBurnt = 0
  const todaysDate = getTodaysDate()
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID, timestamp')
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else if (data.length === 0) {
    return res.status(200).json({ mssg: 'User has no workouts!', totalCaloriesBurnt })
  }
  else {
    const arrayOfWorkoutsToday = []
    for (let i = 0; i < data.length; i++) {
      const workoutTimeStamp = data[i].timestamp
      const workoutDate = getDate(workoutTimeStamp)
      if (workoutDate === todaysDate) {
        arrayOfWorkoutsToday.push(data[i])
      }
    }
    const arrayOfExercisesToday = []
    for (let i = 0; i < arrayOfWorkoutsToday.length; i++) {
      const completedWorkoutID = arrayOfWorkoutsToday[i].completedWorkoutID
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', completedWorkoutID, 'AEID')
      if (error) {
        return res.status(400).json({ mssg: 'Something went wrong!', error })
      }
      else if (data.length === 0) {
        return res.status(400).json({ mssg: 'No workout registered in TrackedWorkoutsWithExercises' })
      }
      else {
        for (let i = 0; i < data.length; i++) {
          arrayOfExercisesToday.push(data[i].AEID)
        }
      }
    }

    for (let i = 0; i < arrayOfExercisesToday.length; i++) {
      const AEID = arrayOfExercisesToday[i]
      const { data, error }: any = await databaseQuery.match(supabase, 'ActualExercises', 'calories', { userID: userid, AEID })
      if (error) {
        return res.status(400).json({ mssg: 'Something went wrong!', error })
      }
      else if (data.length === 0) {
        return res.status(400).json({ mssg: 'Selecting where data.length===0' })
      }
      else {
        const exerciseCaloriesBurnt = data[0].calories
        if (exerciseCaloriesBurnt) {
          totalCaloriesBurnt = Number(totalCaloriesBurnt) + Number(exerciseCaloriesBurnt)
        }
      }
    }
    return res.status(200).json({ mssg: 'Success', totalCaloriesBurnt })
  }
}

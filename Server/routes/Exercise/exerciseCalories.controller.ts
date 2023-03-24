import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { getDate, getTodaysDate } from '../../utils/convertTimeStamptz'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
import validateJSONSchema from '../../utils/validateJSONSchema'
const databaseQuery = new SupabaseQueryClass()

export const getCaloriesToday = async (req: Request, res: Response) => {
  const { userid } = req.headers
  console.log('In getCaloriesToday')
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    console.log('JSON validation failed')
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' })
  }
  let totalCaloriesBurnt = 0
  const todaysDate = getTodaysDate()
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID, timestamp')
  if (error) {
    console.log(`error in getCalories: ${JSON.stringify(error)}`)
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else if (data.length === 0) {
    console.log('User has no workouts!')
    return res.status(200).json({ mssg: 'User has no workouts!', totalCaloriesBurnt })
  }
  else {
    console.log(`data ln 19: ${JSON.stringify(data)}`)
    const arrayOfWorkoutsToday = []
    for (let i = 0; i < data.length; i++) {
      const workoutTimeStamp = data[i].timestamp
      const workoutDate = getDate(workoutTimeStamp)
      console.log(`workoutDate:${workoutDate}`)
      if (workoutDate === todaysDate) {
        arrayOfWorkoutsToday.push(data[i])
      }
    }
    console.log(`arrayOfWorkoutsToday: ${JSON.stringify(arrayOfWorkoutsToday)}`)
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
        console.log(`data ln 44: ${JSON.stringify(data)}`)
        for (let i = 0; i < data.length; i++) {
          arrayOfExercisesToday.push(data[i].AEID)
        }
        console.log(`after push: ${JSON.stringify(arrayOfExercisesToday)}`)
      }
    }
    console.log(`arrayOfExercisesToday: ${JSON.stringify(arrayOfExercisesToday)}`)

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
        console.log(`data ln 61: ${JSON.stringify(data)}`)
        const exerciseCaloriesBurnt = data[0].calories
        if (exerciseCaloriesBurnt) {
          totalCaloriesBurnt = Number(totalCaloriesBurnt) + Number(exerciseCaloriesBurnt)
        }
      }
    }
    console.log(`totalCaloriesBurnt:${totalCaloriesBurnt}`)
    return res.status(200).json({ mssg: 'Success', totalCaloriesBurnt })
  }
}

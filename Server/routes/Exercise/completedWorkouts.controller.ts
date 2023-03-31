import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { getDate, getTime, getTimeStamp, mostRecentTimestamp, sortArrayOfTimeStamps } from '../../utils/convertTimeStamptz'
import { countElementsInArray } from '../../utils/arrayManipulation'
import { schemaForASpecificTrackedWorkout } from '../../utils/JSONSchemas/schemaForASpecificTrackedWorkout'
import validateJSONSchema from '../../utils/validateJSONSchema'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
import { schemaForNewTrackedWorkout } from '../../utils/JSONSchemas/schemaForNewTrackedWorkout'
import { addCompletedWorkoutUnit } from '../../utils/Exercise/createNewTrackedWorkout'
import { deleteWorkoutPlanByID, selectAEIDs, getAEIDsFromCompletedWorkoutIDs, getAllAEIDs, getAllExerciseIDs, getExerciseNames, getExerciseTypes, getWorkoutByID } from '../../utils/Exercise/exerciseFunctions'
import { useridAndDateSchema } from '../../utils/JSONSchemas/Exercise/useridAndDateSchema'
const databaseQuery = new SupabaseQueryClass()

// Get a specific workout by userid, workoutname, date and time
export const getACompletedWorkout = async (req: Request, res: Response) => {
  const { userid, workoutname, date, time } = req.headers
  if (!validateJSONSchema(req.headers, schemaForASpecificTrackedWorkout)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' })
  }
  const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'completedWorkoutID, timestamp', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  // Break down each completed workouts' timestamp and match that with the one given in the headers
  let selectedWorkout
  for (let i = 0; i < data.length; i++) {
    if (getDate(data[i].timestamp) === date && getTime(data[i].timestamp) === time) {
      selectedWorkout = data[i].completedWorkoutID
    }
  }
  if (!selectedWorkout) {
    return res.status(400).json({ mssg: 'A workout of this name at this time and date does not exist for this user!' })
  }

  const { errorPresent, workoutToReturn }: any = await getWorkoutByID(selectedWorkout)
  if (errorPresent) {
    return res.status(400).json({ mssg: 'getWorkoutPlanById failed!', err: errorPresent })
  }
  return res.status(200).json({ mssg: 'Success!', workoutToReturn })
}

// Returns all of a user's completed workouts' names and dates
export const getAllCompletedWorkouts = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname, timestamp')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else {
    const arrayOfTimeStamps = []
    for (let i = 0; i < data.length; i++) {
      const timestamp = data[i].timestamp
      arrayOfTimeStamps.push(timestamp)
    }
    const sortedTimeStamps = sortArrayOfTimeStamps(arrayOfTimeStamps)
    const sortedCompletedWorkouts = []
    for (let i = 0; i < sortedTimeStamps.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (sortedTimeStamps[i] === data[j].timestamp) {
          const timestamp = data[j].timestamp
          delete data[j].timestamp
          data[j].date = getDate(timestamp)
          data[j].time = getTime(timestamp)
          sortedCompletedWorkouts.push(data[j])
        }
      }
    }

    return res.status(200).json({ mssg: 'Got All Completed Workouts!', workoutsNamesAndDates: sortedCompletedWorkouts })
  }
}

export const addCompletedWorkouts = async (req: Request, res: Response) => {
  const { userid, workoutname, exercises } = req.body
  let { timestamp } = req.body
  if (!validateJSONSchema(req.body, schemaForNewTrackedWorkout)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  if (!timestamp) {
    timestamp = getTimeStamp()
  }
  const { errorAddCompletedWorkouts, success } = await addCompletedWorkoutUnit(userid, workoutname, { exercises }, timestamp)
  if (errorAddCompletedWorkouts || !success) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: errorAddCompletedWorkouts })
  }
  return res.status(200).json({ mssg: 'Successfully tracked a workout!' })
}

export const deleteTrackedWorkout = async (req: Request, res: Response) => {
  const { userid, workoutname, date, time } = req.body

  if (!validateJSONSchema(req.body, schemaForASpecificTrackedWorkout)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'completedWorkoutID, timestamp', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  if (data.length === 0) {
    return res.status(400).json({ mssg: 'User does not have any completed workouts!' })
  }
  // Break down each completed workouts' timestamp and match that with the one given in the headers
  let selectedWorkout
  for (let i = 0; i < data.length; i++) {
    if (getDate(data[i].timestamp) === date && getTime(data[i].timestamp) === time) {
      selectedWorkout = data[i].completedWorkoutID
    }
  }
  if (!selectedWorkout) {
    return res.status(400).json({ mssg: 'A workout of this name at this time and date does not exist for this user!' })
  }
  const workoutPlanToDel = selectedWorkout

  const { errorHere, AEIDs } = await selectAEIDs(workoutPlanToDel)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Fail to selectAEIDs', errorHere })
  }

  const { deleteError } = await deleteWorkoutPlanByID(workoutPlanToDel)
  if (deleteError) {
    return res.status(400).json({ mssg: 'Fail to delete WorkoutPlanByID', deleteError })
  }
  for (let i = 0; i < AEIDs.length; i++) {
    const AEID = AEIDs[i].AEID
    const { error }: any = await databaseQuery.deleteFrom(supabase, 'ActualExercises', 'AEID', AEID)
    if (error) {
      return res.status(400).json({ mssg: 'Fail to delete from ActualExercises', error })
    }
  }

  return res.status(200).json({ mssg: `Success deleting trackedWorkout ${String(workoutname)}!` })
}

// Returns the number of times the user has performed all workouts
export const getWorkoutFrequency = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else {
    const arrayOfWorkoutNames = []
    for (let i = 0; i < data.length; i++) {
      arrayOfWorkoutNames.push(data[i].workoutname)
    }

    const graphLabelsAndData: object = countElementsInArray(arrayOfWorkoutNames)
    const graphLabels = Object.keys(graphLabelsAndData)
    const graphData = Object.values(graphLabelsAndData)
    return res.status(200).json({ mssg: 'Success!', graphLabels, graphData })
  }
}

// returns the all exercises performed and frequency for a bar chart
export const getActualExerciseNameFrequency = async (req: Request, res: Response) => {
  const { userid } = req.headers

  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  // @ts-expect-error userid will not be undefined as it is validated against the schema
  const { errorHere, AEIDs } = await getAllAEIDs(userid)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorHere })
  }

  const { errorGetAllExerciseIDs, exerciseIDs } = await getAllExerciseIDs(AEIDs)
  if (errorGetAllExerciseIDs) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetAllExerciseIDs })
  }

  const { errorGetExerciseNames, exerciseNames } = await getExerciseNames(exerciseIDs)
  if (errorGetExerciseNames) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetExerciseNames })
  }
  const graphLabelsAndData = countElementsInArray(exerciseNames)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)
  return res.status(200).json({ mssg: 'Success!', graphLabels, graphData })
}

export const getActualExerciseTypeFrequency = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  // @ts-expect-error userid will not be undefined as it is validated against the schema
  const { errorHere, AEIDs } = await getAllAEIDs(userid)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorHere })
  }

  const { errorGetAllExerciseIDs, exerciseIDs } = await getAllExerciseIDs(AEIDs)
  if (errorGetAllExerciseIDs) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetAllExerciseIDs })
  }
  const { errorGetExerciseTypes, exerciseTypes } = await getExerciseTypes(exerciseIDs)
  if (errorGetExerciseTypes) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetExerciseTypes })
  }
  const graphLabelsAndData = countElementsInArray(exerciseTypes)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)
  return res.status(200).json({ mssg: 'Success!', graphLabels, graphData })
}
// Return any workouts done on the day (Array of Strings)
// Exercises done on the day
export const getWorkoutHistoryByDate = async (req: Request, res: Response) => {
  const { userid, date } = req.headers
  if (!validateJSONSchema(req.headers, useridAndDateSchema)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID, workoutname, timestamp')
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  const arrayOfWorkoutsOnDate = []
  const arrayOfWorkoutNamesAndIDs = []
  const arrayOfCompletedWorkoutIDs = []
  for (let i = 0; i < data.length; i++) {
    if (getDate(data[i].timestamp) === date) {
      arrayOfWorkoutsOnDate.push(data[i])
      arrayOfWorkoutNamesAndIDs.push({ workoutname: data[i].workoutname, workoutID: data[i].completedWorkoutID })
      arrayOfCompletedWorkoutIDs.push(data[i].completedWorkoutID)
    }
  }
  const { errorHere, AEIDs } = await getAEIDsFromCompletedWorkoutIDs(arrayOfCompletedWorkoutIDs)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorHere })
  }

  const { errorGetAllExerciseIDs, exerciseIDs } = await getAllExerciseIDs(AEIDs)
  if (errorGetAllExerciseIDs) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetAllExerciseIDs })
  }

  const { errorGetExerciseNames, exerciseNames } = await getExerciseNames(exerciseIDs)
  if (errorGetExerciseNames) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetExerciseNames })
  }

  const graphLabelsAndData = countElementsInArray(exerciseNames)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)

  return res.status(200).json({ mssg: 'Success!', arrayOfWorkoutNamesAndIDs, graphLabels, graphData })
}

export const getLastTrackedWorkout = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!validateJSONSchema(req.headers, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname, timestamp')
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  if (data.length === 0) {
    return res.status(200).json({ mssg: 'Success!', lastTrackedWorkout: 'No Tracked Workouts' })
  }
  else {
    const arrayOfTimeStamps = []
    for (let i = 0; i < data.length; i++) {
      arrayOfTimeStamps.push(data[i].timestamp)
    }
    const mostRecentTimeStamp = mostRecentTimestamp(arrayOfTimeStamps)
    let lastTrackedWorkout = ''
    for (let i = 0; i < data.length; i++) {
      if (data[i].timestamp === mostRecentTimeStamp) {
        lastTrackedWorkout = data[i].workoutname
      }
    }
    return res.status(200).json({ mssg: 'Success!', lastTrackedWorkout })
  }
}

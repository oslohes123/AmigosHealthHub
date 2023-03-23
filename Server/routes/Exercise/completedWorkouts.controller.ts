import { type Request, type Response } from 'express'
import supabase from '../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import { getDate, getTime, mostRecentTimestamp, sortArrayOfTimeStamps } from '../../utils/convertTimeStamptz'
import { countElementsInArray } from '../../utils/arrayManipulation'
const databaseQuery = new SupabaseQueryClass()

// Get a specific workout by userid, workoutname, date and time
export const getACompletedWorkout = async (req: Request, res: Response) => {
  const { userid, workoutname, date, time } = req.headers

  if (!userid || !workoutname || !date || !time) {
    return res.status(400).json({ mssg: 'No userid, workoutname, date or time' })
  }
  const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'completedWorkoutID, timestamp', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  console.log(`getACompletedWorkout: ${JSON.stringify(data)}`)

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

const getWorkoutByID = async (completedWorkoutID: string) => {
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', completedWorkoutID, '*')

  console.log(`getWorkoutByID: ${JSON.stringify(data)}`)

  const errorAndWorkout = { errorPresent: '', workoutToReturn: [''] }
  if (error) errorAndWorkout.errorPresent = error

  else {
    const arrayOfAEID = []
    for (let i = 0; i < data.length; i++) {
      arrayOfAEID.push(data[i].AEID)
    }

    const arrayOfPossibleExercises = []
    for (let j = 0; j < arrayOfAEID.length; j++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID', arrayOfAEID[j], '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        arrayOfPossibleExercises.push(data[0])
        console.log(`data ln50 getWorkout: ${JSON.stringify(data)}`)
        console.log(`arrayOfPossibleExercises ln: ${JSON.stringify(arrayOfPossibleExercises)}`)
      }
    }
    for (let i = 0; i < arrayOfPossibleExercises.length; i++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfPossibleExercises[i].exerciseID, '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        delete arrayOfPossibleExercises[i].exerciseID
        delete arrayOfPossibleExercises[i].userID
        arrayOfPossibleExercises[i].exercise = data[0]
        console.log(`data ln65 getWorkout: ${JSON.stringify(data)}`)
        console.log(`arrayOfPossibleExercises ln 66: ${JSON.stringify(arrayOfPossibleExercises)}`)
      }
    }
    for (let i = 0; i < arrayOfPossibleExercises.length; i++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID', arrayOfPossibleExercises[i].AEID, '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        // arrayOfPossibleExercises[i].exercise = data[0];
        console.log(`data ln65 getWorkout: ${JSON.stringify(data)}`)
        console.log(`arrayOfPossibleExercises ln 66: ${JSON.stringify(arrayOfPossibleExercises)}`)
      }
    }

    errorAndWorkout.workoutToReturn = arrayOfPossibleExercises
  }
  return errorAndWorkout
}

// Returns all of a user's completed workouts' names and dates
export const getAllCompletedWorkouts = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!userid) {
    return res.status(400).json({ mssg: 'No userid provided!' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname, timestamp')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else {
    console.log(`data of completedWorkouts: ${JSON.stringify(data)}`)
    const arrayOfTimeStamps = []
    for (let i = 0; i < data.length; i++) {
      const timestamp = data[i].timestamp
      arrayOfTimeStamps.push(timestamp)
    }
    const sortedTimeStamps = sortArrayOfTimeStamps(arrayOfTimeStamps)
    let sortedCompletedWorkouts = []
    for (let i = 0; i < sortedTimeStamps.length; i++) {
      // console.log(`data[i].timestamp: ${JSON.stringify(data[i].timestamp)}`)
      // console.log(`sortedTimeStamps[i]: ${JSON.stringify(sortedTimeStamps[i])}`)
      // if (data[i].timestamp === sortedTimeStamps[i]) {
      //   const timestamp = data[i].timestamp
      //   delete data[i].timestamp
      //   data[i].date = getDate(timestamp)
      //   data[i].time = getTime(timestamp)
      //   sortedCompletedWorkouts.push(data[i])
      // }
      for (let j = 0; j < data.length; j++) {
        if (sortedTimeStamps[i] === data[j].timestamp) {
          const timestamp = data[i].timestamp
          delete data[i].timestamp
          data[i].date = getDate(timestamp)
          data[i].time = getTime(timestamp)
          sortedCompletedWorkouts.push(data[i])
        }
      }
    }
    console.log(`sortedCompletedWorkouts: ${JSON.stringify(sortedCompletedWorkouts)}`)
    console.log(`After mod completedWorkouts: ${JSON.stringify(data)}`)
    // const workoutsNamesAndDates = data
    return res.status(200).json({ mssg: 'Got All Completed Workouts!', workoutsNamesAndDates: sortedCompletedWorkouts })
  }
}

// search for an exercise by name in the Exercises table
export const searchExerciseInExercises = async (name: string) => {
  const errorAndIDs = { errorPresent: '', ID: '' }
  // Allow instructions to be the empty string
  if (!name) {
    errorAndIDs.errorPresent = 'Name is empty!'
    return errorAndIDs
  }
  else {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'name', name, '*')

    if (error) {
      console.log('Error selecting from Exercises table!')
      errorAndIDs.errorPresent = error
      return errorAndIDs
    }
    if (data.length <= 0) {
      errorAndIDs.errorPresent = 'No exercise of given name exists!'
      return errorAndIDs
    }
    else {
      const exerciseID = data[0].ExerciseID
      errorAndIDs.ID = exerciseID
      return errorAndIDs
    }
  }
}

export const addCompletedWorkouts = async (req: Request, res: Response) => {
  const { userid, workoutname, exercises } = req.body

  if (!userid || !workoutname || !exercises) {
    return res.status(400).json({ mssg: 'userid, workoutname or exercises is missing!' })
  }
  console.log(`req.body in addCompletedWorkouts:${JSON.stringify(req.body)}`)
  for (let i = 0; i < exercises.length; i++) {
    try {
      const { name } = exercises[i]

      if (!Object.prototype.hasOwnProperty.call(exercises[i], 'name')) {
        return res.status(400).json({ mssg: "Exercise doesn't have one of the following properties:name" })
      }
      console.log(`exercises[i] before delete for: ${JSON.stringify(exercises[i])}`)

      Object.keys(exercises[i]).forEach((k) => (exercises[i])[k] == null && delete (exercises[i])[k])
      console.log(`exercises[i] after delete for:  ${JSON.stringify(exercises[i])}`)
      const { errorPresent, ID } = await searchExerciseInExercises(name)
      if (errorPresent) {
        console.log(`errorPresent: ${errorPresent}`)
        return res.status(400).json({ mssg: errorPresent, error: 'error' })
      }
      else {
        exercises[i].exerciseID = ID
        exercises[i].userID = userid
        delete exercises[i].type
        delete exercises[i].name
        delete exercises[i].muscle
        delete exercises[i].difficulty
        delete exercises[i].instructions
        delete exercises[i].equipment
      }
    }
    catch (error) {
      return res.status(400).json({ mssg: 'Failure', error })
    }
  }

  console.log(`exercises after mod: ${JSON.stringify(exercises)}`)

  // 1. Create a record in completed workouts
  const { data, error }: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Sorry something went wrong!', error })
  }
  const completedWorkoutID = data[0].completedWorkoutID
  // 2. Add each exercise in exercises to actual exercise
  const numberOfExercises = exercises.length
  const arrayOfAEIDs = []
  for (let i = 0; i < numberOfExercises; i++) {
    const { data, error }: any = await databaseQuery.insert(supabase, 'ActualExercises', exercises[i])

    if (error) {
      console.log(error)
      return res.status(400).json({ mssg: 'Tracking a Workout Failed!', err: error })
    }
    arrayOfAEIDs.push(data[0].AEID)
    // possible exercise already exists
  }
  // 3.  Create a record in TrackedWorkoutsWithExercises for each exercise in the workoutplan.
  for (let i = 0; i < arrayOfAEIDs.length; i++) {
    const { error }: any = await databaseQuery.insert(supabase, 'TrackedWorkoutsWithExercises', { completedWorkoutID, AEID: arrayOfAEIDs[i] })
    if (error) {
      return res.status(400).json({ mssg: 'Something went wrong!', error })
    }
  }
  return res.status(200).json({ mssg: 'Successfully tracked a workout!' })
}

const deleteWorkoutPlanByID = async (completedWorkoutID: string) => {
  const errorAndIDs = { deleteError: '' }
  const { error }: any = await databaseQuery.deleteFrom(supabase, 'CompletedWorkouts', 'completedWorkoutID', completedWorkoutID)
  if (error) {
    errorAndIDs.deleteError = error
    return errorAndIDs
  }
  return errorAndIDs
}
const selectAEIDs = async (workoutPlanToDel: string) => {
  console.log(`workoutPlanToDel ln253: ${workoutPlanToDel}`)
  const errorAndIDs: any = { errorHere: '', AEIDs: [{}] }
  // const {data, error}:any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises','completedWorkoutID', "d05a8235-98f9-4a90-b982-306655813916",'AEID');
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', workoutPlanToDel, 'AEID')
  console.log(`data ln 257: ${JSON.stringify(data)}`)
  if (error) {
    errorAndIDs.errorHere = error
    return errorAndIDs
  }
  errorAndIDs.AEIDs = data
  return errorAndIDs
}

export const deleteTrackedWorkout = async (req: Request, res: Response) => {
  const { userid, workoutname, date, time } = req.body

  if (!userid || !workoutname || !date || !time) {
    return res.status(400).json({ mssg: 'No userid, workoutname, date or time' })
  }
  const { data, error }: any = await databaseQuery.match(supabase, 'CompletedWorkouts', 'completedWorkoutID, timestamp', { userid, workoutname })
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  console.log(`getACompletedWorkout: ${JSON.stringify(data)}`)

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
  if (data.length === 0) {
    return res.status(400).json({ mssg: 'User does not have a plan of that name!' })
  }
  const workoutPlanToDel = selectedWorkout

  const { errorHere, AEIDs } = await selectAEIDs(workoutPlanToDel)
  console.log(`AEIDs ln 282: ${JSON.stringify(AEIDs)}`)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Fail to selectAEIDs', errorHere })
  }

  const { deleteError } = await deleteWorkoutPlanByID(workoutPlanToDel)
  if (deleteError) {
    return res.status(400).json({ mssg: 'Fail to delete WorkoutPlanByID', deleteError })
  }
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
  if (!userid) {
    return res.status(400).json({ mssg: 'userid cannot be empty' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname')

  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  else {
    console.log(`data ln 392: ${JSON.stringify(data)}`)
    // if(data.length === 0){
    //     return res.status(200).json({mssg:`Success!`, workouts: data});
    // }
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

// given an arrayOfCompletedWorkoutIDs return the AEIDs associated
export const getAEIDsFromCompletedWorkoutIDs = async (arrayOfCompletedWorkoutIDs: string[]) => {
  const errorAndAEIDs: any = { errorHere: '', AEIDs: [{}] }
  const arrayOfAEIDs = []
  for (let i = 0; i < arrayOfCompletedWorkoutIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', arrayOfCompletedWorkoutIDs[i], 'AEID')
    if (error) {
      errorAndAEIDs.errorHere = error
      return errorAndAEIDs
    }
    else {
      for (let i = 0; i < data.length; i++) {
        arrayOfAEIDs.push(data[i].AEID)
      }
    }
  }
  errorAndAEIDs.AEIDs = arrayOfAEIDs
  return errorAndAEIDs
}

// get all AEIDs of a user given an userid
export const getAllAEIDs = async (userid: string | string[]) => {
  const errorAndIDs: any = { errorHere: '', AEIDs: [{}] }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID')
  if (error) {
    errorAndIDs.errorHere = error
    return errorAndIDs
  }
  console.log(`dataln362: ${JSON.stringify(data)}`)
  const arrayOfCompletedWorkoutIDs = []
  // get all CompletedWorkoutIDs
  for (let i = 0; i < data.length; i++) {
    arrayOfCompletedWorkoutIDs.push(data[i].completedWorkoutID)
  }
  console.log(`arrayOfCompletedWorkoutIDs: ${JSON.stringify(arrayOfCompletedWorkoutIDs)}`)
  // get all trackedWorkoutsWithExercises, then all AEIDs
  const arrayOfAEIDs = []
  for (let i = 0; i < arrayOfCompletedWorkoutIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', arrayOfCompletedWorkoutIDs[i], 'AEID')
    if (error) {
      errorAndIDs.errorHere = error
      return errorAndIDs
    }
    else {
      for (let i = 0; i < data.length; i++) {
        arrayOfAEIDs.push(data[i].AEID)
      }
    }
  }
  console.log(`arrayOfAEIDs: ${JSON.stringify(arrayOfAEIDs)}`)
  errorAndIDs.AEIDs = arrayOfAEIDs
  return errorAndIDs
}
// Given a list of AEIDs, return an array of exerciseIDs
export const getAllExerciseIDs = async (AEIDs: string[]) => {
  const errorAndExerciseIDs: any = { errorGetAllExerciseIDs: '', exerciseIDs: [{}] }
  const arrayOfExerciseIDs = []
  for (let i = 0; i < AEIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'ActualExercises', 'AEID', AEIDs[i], 'exerciseID')
    if (error) {
      errorAndExerciseIDs.errorGetAllExerciseIDs = error
      return errorAndExerciseIDs
    }
    else {
      arrayOfExerciseIDs.push(data[0].exerciseID)
    }
  }
  console.log(`arrayOfExerciseIDs ln405: ${JSON.stringify(arrayOfExerciseIDs)}`)
  errorAndExerciseIDs.exerciseIDs = arrayOfExerciseIDs
  return errorAndExerciseIDs
}

export const getExerciseNames = async (arrayOfExerciseIDs: string[]) => {
  const errorAndExerciseNames: any = { errorGetExerciseNames: '', exerciseNames: [{}] }
  const arrayOfExerciseNames = []
  for (let i = 0; i < arrayOfExerciseIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfExerciseIDs[i], 'name')
    if (error) {
      errorAndExerciseNames.errorGetExerciseNames = error
      return errorAndExerciseNames
    }
    else {
      arrayOfExerciseNames.push(data[0].name)
    }
  }
  errorAndExerciseNames.exerciseNames = arrayOfExerciseNames
  return errorAndExerciseNames
}
export const getExerciseTypes = async (arrayOfExerciseIDs: string[]) => {
  const errorAndExerciseTypes: any = { errorGetExerciseTypes: '', exerciseTypes: [{}] }
  const arrayOfExerciseTypes = []
  for (let i = 0; i < arrayOfExerciseIDs.length; i++) {
    const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfExerciseIDs[i], 'type')
    if (error) {
      errorAndExerciseTypes.errorGetExerciseTypes = error
      return errorAndExerciseTypes
    }
    else {
      arrayOfExerciseTypes.push(data[0].type)
    }
  }
  errorAndExerciseTypes.exerciseTypes = arrayOfExerciseTypes
  return errorAndExerciseTypes
}
// returns the all exercises performed and frequency for a bar chart
export const getActualExerciseNameFrequency = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!userid) {
    return res.status(400).json({ mssg: 'userid cannot be empty' })
  }
  const { errorHere, AEIDs } = await getAllAEIDs(userid)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorHere })
  }

  const { errorGetAllExerciseIDs, exerciseIDs } = await getAllExerciseIDs(AEIDs)
  if (errorGetAllExerciseIDs) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetAllExerciseIDs })
  }
  console.log(`exerciseIDs: ${JSON.stringify(exerciseIDs)}`)

  const { errorGetExerciseNames, exerciseNames } = await getExerciseNames(exerciseIDs)
  if (errorGetExerciseNames) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetExerciseNames })
  }
  console.log(`exerciseNames: ${JSON.stringify(exerciseNames)}`)

  const graphLabelsAndData = countElementsInArray(exerciseNames)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)
  return res.status(200).json({ mssg: 'Success!', graphLabels, graphData })
}

export const getActualExerciseTypeFrequency = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!userid) {
    return res.status(400).json({ mssg: 'userid cannot be empty' })
  }
  const { errorHere, AEIDs } = await getAllAEIDs(userid)
  if (errorHere) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorHere })
  }

  const { errorGetAllExerciseIDs, exerciseIDs } = await getAllExerciseIDs(AEIDs)
  if (errorGetAllExerciseIDs) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetAllExerciseIDs })
  }
  console.log(`exerciseIDs: ${JSON.stringify(exerciseIDs)}`)

  const { errorGetExerciseTypes, exerciseTypes } = await getExerciseTypes(exerciseIDs)
  if (errorGetExerciseTypes) {
    return res.status(400).json({ mssg: 'Something went wrong!', errorGetExerciseTypes })
  }
  console.log(`exerciseTypes: ${JSON.stringify(exerciseTypes)}`)

  const graphLabelsAndData = countElementsInArray(exerciseTypes)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)
  return res.status(200).json({ mssg: 'Success!', graphLabels, graphData })
}
// Return any workouts done on the day (Array of Strings)
// Exercises done on the day
export const getWorkoutHistoryByDate = async (req: Request, res: Response) => {
  const { userid, date } = req.headers
  if (!userid || !date) {
    return res.status(400).json({ mssg: 'userid nor date can be null' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID, workoutname, timestamp')
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  console.log(`data ln 510: ${JSON.stringify(data)}`)
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
  console.log(`arrayOfWorkoutsOnDate: ${JSON.stringify(arrayOfWorkoutsOnDate)}`)
  console.log(`arrayOfWorkoutNames: ${JSON.stringify(arrayOfWorkoutNamesAndIDs)}`)
  console.log(`arrayOfCompletedWorkoutIDs: ${JSON.stringify(arrayOfCompletedWorkoutIDs)}`)

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
  console.log(`exerciseNames: ${JSON.stringify(exerciseNames)}`)

  const graphLabelsAndData = countElementsInArray(exerciseNames)
  const graphLabels = Object.keys(graphLabelsAndData)
  const graphData = Object.values(graphLabelsAndData)
  console.log(`graphLabels: ${JSON.stringify(graphLabels)}`)
  console.log(`graphData: ${JSON.stringify(graphData)}`)

  return res.status(200).json({ mssg: 'Success!', arrayOfWorkoutNamesAndIDs, graphLabels, graphData })
}

export const getLastTrackedWorkout = async (req: Request, res: Response) => {
  const { userid } = req.headers
  if (!userid) {
    return res.status(400).json({ mssg: 'userid cannot be null!' })
  }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'workoutname, timestamp')
  if (error) {
    return res.status(400).json({ mssg: 'Something went wrong!', error })
  }
  console.log(`data ln 581: ${JSON.stringify(data)}`)
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

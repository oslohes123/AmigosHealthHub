import supabase from '../General/supabaseSetUp'
import { SupabaseQueryClass } from '../General/databaseInterface'
const databaseQuery = new SupabaseQueryClass()

export async function insertCompletedWorkoutRow (id: string, workoutname: string, timestamp: string, table = 'CompletedWorkouts', database = supabase) {
  const { data, error }: any = await databaseQuery.insert(supabase, 'CompletedWorkouts', { userid: id, workoutname, timestamp })
  return { dataInsertCompletedWorkoutRow: data, errorInsertCompletedWorkoutRow: error }
}
// Matches all instances in the WorkoutPlans table given a userid and workoutname
export async function matchWorkoutPlanAndUser (userid: string, workoutname: string) {
  const { data, error }: any = await databaseQuery.match(supabase, 'WorkoutPlans', 'WorkoutPlanID', { userid, workoutname })
  return { dataMatchingWorkoutPlanAndUser: data, errorMatchingWorkoutPlanAndUser: error }
}

/**
 * Deletes a workout plan row
 * @param workoutPlanID id of workoutplan row to delete
 * @returns errorAndIDs object with deleteError property that contains any errors
 */
export async function deleteWorkoutPlanRowByID (workoutPlanID: string) {
  const errorAndIDs = { deleteError: '' }
  const { error }: any = await databaseQuery.deleteFrom(supabase, 'WorkoutPlans', 'WorkoutPlanID', workoutPlanID)
  if (error) {
    errorAndIDs.deleteError = error
    return errorAndIDs
  }
  return errorAndIDs
}
export async function selectAllCompletedWorkoutNames (userid: string, table = 'CompletedWorkouts', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'userid', userid, 'completedWorkoutID, workoutname')
  return { dataSelectAllCompletedWorkoutNames: data, errorSelectAllCompletedWorkoutNames: error }
}

export async function selectAllTrackedWorkoutsWithExercises (workoutPlanID: string, table = 'TrackedWorkoutsWithExercises', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'completedWorkoutID', workoutPlanID, 'id')
  return { dataSelectAllTrackedWorkoutsWithExercises: data, errorSelectAllTrackedWorkoutsWithExercises: error }
}

export async function selectAllActualExercises (userid: string, table = 'ActualExercises', database = supabase) {
  const { data, error }: any = await databaseQuery.selectWhere(database, table, 'userID', userid, 'AEID')
  return { dataSelectAllActualExercises: data, errorSelectAllActualExercises: error }
}
// return all exercises from actual exercises that match a given userid and exerciseid
export async function matchExercise (userid: string | string[], exerciseID: string) {
  const errorAndIDs: any = { errorPresent: '', exercisesMatch: [{}, {}] }
  const { data, error }: any = await databaseQuery.match(supabase, 'ActualExercises', '*', { userID: userid, exerciseID })
  if (error) {
    errorAndIDs.errorPresent = error
    return errorAndIDs
  }
  else {
    errorAndIDs.exercisesMatch = data
    return errorAndIDs
  }
}

/**
 *
 * @param name name of exercise
 * @returns {errorPresent, ID} ID is the exerciseID
 */
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

export async function deleteWorkoutPlanByID (completedWorkoutID: string) {
  const errorAndIDs = { deleteError: '' }
  const { error }: any = await databaseQuery.deleteFrom(supabase, 'CompletedWorkouts', 'completedWorkoutID', completedWorkoutID)
  if (error) {
    errorAndIDs.deleteError = error
    return errorAndIDs
  }
  return errorAndIDs
}
export async function selectAEIDs (workoutPlanToDel: string) {
  const errorAndIDs: any = { errorHere: '', AEIDs: [{}] }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', workoutPlanToDel, 'AEID')
  if (error) {
    errorAndIDs.errorHere = error
    return errorAndIDs
  }
  errorAndIDs.AEIDs = data
  return errorAndIDs
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
export async function getAllAEIDs (userid: string | string[]) {
  const errorAndIDs: any = { errorHere: '', AEIDs: [{}] }
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'CompletedWorkouts', 'userid', userid, 'completedWorkoutID')
  if (error) {
    errorAndIDs.errorHere = error
    return errorAndIDs
  }
  const arrayOfCompletedWorkoutIDs = []
  // get all CompletedWorkoutIDs
  for (let i = 0; i < data.length; i++) {
    arrayOfCompletedWorkoutIDs.push(data[i].completedWorkoutID)
  }
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
  errorAndIDs.AEIDs = arrayOfAEIDs
  return errorAndIDs
}
// Given a list of AEIDs, return an array of exerciseIDs
export async function getAllExerciseIDs (AEIDs: string[]) {
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
  errorAndExerciseIDs.exerciseIDs = arrayOfExerciseIDs
  return errorAndExerciseIDs
}

export async function getExerciseNames (arrayOfExerciseIDs: string[]) {
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
export async function getExerciseTypes (arrayOfExerciseIDs: string[]) {
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

export async function getWorkoutByID (completedWorkoutID: string) {
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'TrackedWorkoutsWithExercises', 'completedWorkoutID', completedWorkoutID, '*')

  const errorAndWorkout: any = { errorPresent: '', workoutToReturn: [] }
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
      }
    }
    for (let i = 0; i < arrayOfPossibleExercises.length; i++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfPossibleExercises[i].exerciseID, '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        delete arrayOfPossibleExercises[i].exerciseID
        delete arrayOfPossibleExercises[i].userID
        arrayOfPossibleExercises[i].exercise = data[0]
      }
    }

    errorAndWorkout.workoutToReturn = arrayOfPossibleExercises
  }
  return errorAndWorkout
}

// helper function to getWorkoutDetails
export async function getWorkoutPlanByID (workoutPlanID: string) {
  const { data, error }: any = await databaseQuery.selectWhere(supabase, 'WorkoutPlansWithExercises', 'WorkoutPlanID', workoutPlanID, '*')
  const errorAndWorkout: any = { errorPresent: '', workoutToReturn: [] }
  if (error) errorAndWorkout.errorPresent = error
  else {
    const arrayOfPEID = []
    for (let i = 0; i < data.length; i++) {
      arrayOfPEID.push(data[i].PEID)
    }

    const arrayOfPossibleExercises = []
    for (let j = 0; j < arrayOfPEID.length; j++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'PossibleExercises', 'PEID', arrayOfPEID[j], '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        arrayOfPossibleExercises.push(data[0])
      }
    }

    for (let i = 0; i < arrayOfPossibleExercises.length; i++) {
      const { data, error }: any = await databaseQuery.selectWhere(supabase, 'Exercises', 'ExerciseID', arrayOfPossibleExercises[i].exerciseID, '*')
      if (error) errorAndWorkout.errorPresent = error
      else {
        delete arrayOfPossibleExercises[i].exerciseID
        delete arrayOfPossibleExercises[i].userID
        arrayOfPossibleExercises[i].exercise = data[0]
      }
    }
    errorAndWorkout.workoutToReturn = arrayOfPossibleExercises
  }
  return errorAndWorkout
}

import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
// import supabase from '../../../../utils/supabaseSetUp'
// import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getCaloriesToday } from '../../../../routes/Exercise/exerciseCalories.controller'
import test from 'ava'
import sinon from 'sinon'
// import createNewWorkoutPlan from '../../../../utils/Exercise/createNewWorkoutPlan'
// import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/deleteWorkoutPlans'
import { addCompletedWorkouts } from '../../../../utils/Exercise/createNewTrackedWorkout'
// import addExerciseToExercises from '../../../../utils/Exercise/addExerciseToExercises'
import { deleteMultipleExercises, insertMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
// const databaseQuery = new SupabaseQueryClass()
let randomEmail: string
const uuid = uuidv4()
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Calories',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
})

const mockRequest = (sessionData: any) => {
  return {
    headers: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
test.after.always('guaranteed cleanup of user', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})

test.serial('getCaloriesToday with no userid provided should return error', async (t: any) => {
  const req = mockRequest({})
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test.serial('user with no workouts has burnt 0 calories', async (t: any) => {
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'User has no workouts!', totalCaloriesBurnt: 0 }))
})

test('getCaloriesToday with user with a valid workoutplan returns the correct number of calories burnt', async (t: any) => {
  const exercises = {
    exercises: [
      {
        name: `Test Curl ${uuid}`,
        sets: 3,
        weight: [12, 12, 12],
        warmUpSet: false,
        reps: [12, 6, 5],
        calories: 50,
        distance: null,
        duration: null
      },
      {
        name: `Slow Jog ${uuid}`,
        sets: null,
        weight: null,
        warmUpSet: 'false',
        reps: null,
        calories: 50,
        distance: 5000,
        duration: 23.00
      }
    ]
  }
  const { errorInsertingMultipleExercises } = await insertMultipleExercises([
    { type: 'strength', name: `Test Curl ${uuid}`, muscle: 'bicep', difficulty: 'beginner', instructions: 'curl the weight', equipment: 'dumbbell' },
    { type: 'strength', name: `Slow Jog ${uuid}`, muscle: 'legs', difficulty: 'beginner', instructions: 'jog', equipment: 'none' }])

  if (errorInsertingMultipleExercises) {
    t.fail(errorInsertingMultipleExercises)
  }
  const { errorAddCompletedWorkouts, success } = await addCompletedWorkouts(uuid, 'Test Tracked Workout', exercises)
  if (errorAddCompletedWorkouts) {
    t.fail(errorAddCompletedWorkouts)
  }
  if (!success) {
    t.fail('errorsCreatingNewWorkoutPlan')
  }
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)
  t.log(`ln100: ${JSON.stringify(res.json.getCall(0).args[0])}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success', totalCaloriesBurnt: 100 }))
  // delete all workoutplans
})

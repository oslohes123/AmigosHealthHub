import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword } from '../../../../utils/userFunctions'
import { addCompletedWorkouts } from '../../../../routes/Exercise/completedWorkouts.controller'
// import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
// import { addCompletedWorkouts } from '../../../../routes/Exercise/completedWorkouts.controller'

let randomEmail: string
const uuid = uuidv4()
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Jane',
    lastName: 'Doe',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
})

test.after.always('guaranteed cleanup of user and delete exercises', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

const mockRequest = (sessionData: any) => {
  return {
    body: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
const exercisesWorkoutPlan = {
  exercises: [
    {
      name: 'Machine Bicep Curl',
      sets: 3,
      weight: [12, 12, 12],
      warmUpSet: false,
      reps: [12, 6, 5],
      calories: 50,
      distance: null,
      duration: null
    },
    {
      name: 'Slow Jog',
      sets: null,
      weight: null,
      warmUpSet: false,
      reps: null,
      calories: 50,
      distance: 5000,
      duration: 23.00
    }
  ]
}
// test for missing userid results in error
test('addCompletedWorkouts with missing userid results in error', async (t: any) => {
  const req = mockRequest({ workoutname: 'Test Track Workout Name', exercises: exercisesWorkoutPlan })
  const res = mockResponse()
  await addCompletedWorkouts(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})
test('addCompletedWorkouts with missing workoutname results in error', async (t: any) => {
  const req = mockRequest({ userid: uuid, exercises: exercisesWorkoutPlan })
  const res = mockResponse()
  await addCompletedWorkouts(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('addCompletedWorkouts with missing exercises results in error', async (t: any) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Track Workout Name' })
  const res = mockResponse()
  await addCompletedWorkouts(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('addCompletedWorkouts with bad timestamp format results in error', async (t: any) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Track Workout Name', exercises: exercisesWorkoutPlan, timestamp: uuid })
  const res = mockResponse()
  await addCompletedWorkouts(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(res.status.calledWith(400))
  t.true(argsPassed.mssg === 'Something went wrong!')
})

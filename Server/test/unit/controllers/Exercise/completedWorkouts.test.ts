import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getACompletedWorkout } from '../../../../routes/Exercise/completedWorkouts.controller'

const uuid = uuidv4()
const randomEmail = `${uuid}@example.com`
test.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('Password123!')
  const { error } = await createUserWithID({
    id: uuid,
    firstName: 'firstName',
    lastName: 'lastName',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })
  if (error) {
    t.fail(JSON.stringify(error))
  }
})
test.after.always(async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail('Deleting user went wrong!')
  }
})
const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockRequest = (sessionData: any) => {
  return {
    headers: sessionData
  }
}
// test getACompletedWorkout with missing headers (userid, workoutname, date, time)
test('getACompletedWorkout with missing userid returns error', async (t: any) => {
  const req = mockRequest({ workoutname: 'Test Workout', date: '2023-05-13', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing workoutname returns error', async (t: any) => {
  const req = mockRequest({ userid: uuid, date: '2023-05-13', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing date returns error', async (t: any) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Workout', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing time returns error', async (t: any) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Workout', date: '2023-05-13' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})
// test getACompletedWorkout with wrong date format
// test getACompletedWorkout with wrong time format

// test getACompletedWorkout with userid who doesn't exist

// test getACompletedWorkout with userid who has no completed workouts

// test getACompletedWorkout with userid who has a completed workout

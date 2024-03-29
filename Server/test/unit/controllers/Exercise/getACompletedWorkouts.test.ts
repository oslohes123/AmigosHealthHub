import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/User/userFunctions'
import { getACompletedWorkout } from '../../../../routes/Exercise/completedWorkouts.controller'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { getTime, getDate } from '../../../../utils/General/convertTimeStamptz'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
const uuid = uuidv4()
const randomEmail = `${uuid}@example.com`
test.before(async (t: ExecutionContext) => {
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
test.after.always(async (t: ExecutionContext) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail('Deleting user went wrong!')
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
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
test('getACompletedWorkout with missing userid returns error', async (t: ExecutionContext) => {
  const req = mockRequest({ workoutname: 'Test Workout', date: '2023-05-13', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing workoutname returns error', async (t: ExecutionContext) => {
  const req = mockRequest({ userid: uuid, date: '2023-05-13', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing date returns error', async (t: ExecutionContext) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Workout', time: '18:55:33' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test('getACompletedWorkout with missing time returns error', async (t: ExecutionContext) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Workout', date: '2023-05-13' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

// test getACompletedWorkout with userid who doesn't exist
test('getACompletedWorkout with userid who does not exist returns error', async (t: ExecutionContext) => {
  const fakeUserID = uuidv4()
  const req = mockRequest({ userid: fakeUserID, workoutname: 'Test Workout', date: '2023-05-13', time: '18:33:22' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})
// test getACompletedWorkout with userid who has no completed workouts
test('getACompletedWorkout with user has does not have a workout at the given time and date returns error', async (t: ExecutionContext) => {
  const req = mockRequest({ userid: uuid, workoutname: 'Test Workout', date: '2023-05-13', time: '18:33:22' })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})
// test getACompletedWorkout with userid who has a completed workout
test('getACompletedWorkout with created completed workout returns success', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Tracked Workout'
  const timeOfCreationOfWorkout = '2006-03-26T13:28:10+00:00'
  const dateOfCreationOfWorkout = getDate(timeOfCreationOfWorkout)
  const timeOfCreation = getTime(timeOfCreationOfWorkout)
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout, timeOfCreationOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }

  const req = mockRequest({ userid: uuid, workoutname: 'Test Tracked Workout', date: dateOfCreationOfWorkout, time: timeOfCreation })
  const res = mockResponse()

  await getACompletedWorkout(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(argsPassed.mssg === 'Success!')
  t.true(res.status.calledWith(200))
  t.true(argsPassed.workoutToReturn.length === 2)
  t.true(argsPassed.workoutToReturn[0].exercise.name === `Test Curl ${uuid}`)
  t.true(argsPassed.workoutToReturn[1].exercise.name === `Slow Jog ${uuid}`)
  // t.true(res.json.calledWith({ mssg: 'Success!', workoutToReturn }))
})

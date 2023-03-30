import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword } from '../../../../utils/userFunctions'
import { deleteTrackedWorkout } from '../../../../routes/Exercise/completedWorkouts.controller'
import cloneDeep from 'lodash/cloneDeep'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
// import { selectAllActualExercises, selectAllCompletedWorkoutNames, selectAllTrackedWorkoutsWithExercises } from '../../../../utils/Exercise/exerciseFunctions'
import { getTime, getTodaysDate, getDate } from '../../../../utils/convertTimeStamptz'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'

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
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
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
interface deleteTrackedWorkoutRequest {
  userid?: string
  workoutname?: string
  time?: string
  date?: string
}
const validRequest: deleteTrackedWorkoutRequest = {
  userid: uuid,
  workoutname: 'Test Track Workout Name',
  time: '18:03:23',
  date: getTodaysDate()
}
// Test deleteTrackedWorkout with missing userid/workoutname/date/time

test('deleteTrackedWorkout results in error when userid is missing', async (t: any) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.userid
  const req = mockRequest(cloneValidRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('deleteTrackedWorkout results in error when workoutname is missing', async (t: any) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.workoutname
  const req = mockRequest(cloneValidRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('deleteTrackedWorkout results in error when date is missing', async (t: any) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.date
  t.log(`cloneValidRequest date missing: ${JSON.stringify(cloneValidRequest)}`)
  const req = mockRequest(cloneValidRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('deleteTrackedWorkout results in error when time is missing', async (t: any) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.time
  const req = mockRequest(cloneValidRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('deleteTrackedWorkout results in error when user has no completed workouts', async (t: any) => {
  const fakeWorkoutRequest = cloneDeep(validRequest)

  const req = mockRequest(fakeWorkoutRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`deleteTrackedWorkout argsPassed: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'User does not have any completed workouts!' }))
})

test.serial('deleteTrackedWorkout results in success when given correct workout details', async (t: any) => {
  const nameOfWorkout = validRequest.workoutname
  const timestampOfCreationOfWorkout = '2006-03-26T13:28:10+00:00'
  const dateOfCreationOfWorkout = getDate(timestampOfCreationOfWorkout)
  const timeOfCreationOfWorkout = getTime(timestampOfCreationOfWorkout)
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout, timestampOfCreationOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const validWorkoutRequest = cloneDeep(validRequest)
  validWorkoutRequest.date = dateOfCreationOfWorkout
  validWorkoutRequest.time = timeOfCreationOfWorkout
  const req = mockRequest(validWorkoutRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`deleteTrackedWorkout success test argsPassed: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: `Success deleting trackedWorkout ${String(validWorkoutRequest.workoutname)}!` }))
})

test.serial('deleteTrackedWorkout results in error when user has workout of the same name but at a different given time/date', async (t: any) => {
  const nameOfWorkout = validRequest.workoutname
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const incorrectWorkoutRequest = cloneDeep(validRequest)

  const req = mockRequest(incorrectWorkoutRequest)
  const res = mockResponse()
  await deleteTrackedWorkout(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`deleteTrackedWorkout last test argsPassed: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})

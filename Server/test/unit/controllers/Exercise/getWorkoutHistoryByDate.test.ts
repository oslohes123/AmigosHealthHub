import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword } from '../../../../utils/userFunctions'
import { getWorkoutHistoryByDate } from '../../../../routes/Exercise/completedWorkouts.controller'
import cloneDeep from 'lodash/cloneDeep'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
// import { selectAllActualExercises, selectAllCompletedWorkoutNames, selectAllTrackedWorkoutsWithExercises } from '../../../../utils/Exercise/exerciseFunctions'
import { getTodaysDate } from '../../../../utils/convertTimeStamptz'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'

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
interface getWorkoutHistoryByDateRequest {
  userid?: string
  date?: string
}
const validRequest: getWorkoutHistoryByDateRequest = {
  userid: uuid,
  date: getTodaysDate()
}

test('getWorkoutHistoryByDate returns error when userid is missing', async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test('getWorkoutHistoryByDate returns error when date is missing', async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.date
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getWorkoutHistoryByDate returns empty arrays with user who has no workouts', async (t: ExecutionContext) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', arrayOfWorkoutNamesAndIDs: [], graphLabels: [], graphData: [] }))
})

test.serial('getWorkoutHistoryByDate returns arrays of data with user who has workouts', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Workout Plan'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Success!')
  t.true(JSON.stringify(argsPassed.graphLabels) === JSON.stringify([`Test Curl ${uuid}`, `Slow Jog ${uuid}`]))
  t.true(JSON.stringify(argsPassed.graphData) === JSON.stringify([1, 1]))
  try {
    t.true(argsPassed.arrayOfWorkoutNamesAndIDs[0].workoutname === nameOfWorkout)
  }
  catch (error) {
    t.fail('Failed to get first index of array or workoutname property')
  }
})

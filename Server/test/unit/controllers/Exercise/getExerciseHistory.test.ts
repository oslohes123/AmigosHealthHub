import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import setUpWorkoutPlan from '../../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { getExerciseHistory } from '../../../../routes/Exercise/exerciseHistory.controller'
import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/Exercise/deleteWorkoutPlans'
import { getTodaysDate } from '../../../../utils/convertTimeStamptz'
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
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
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
interface getExerciseHistoryRequest {
  userid?: string
  nameofexercise?: string
}
const validRequest: getExerciseHistoryRequest = {
  userid: uuid,
  nameofexercise: `Random ${uuid} exercise`
}

test.serial('getExerciseHistory returns error when userid is missing', async (t: ExecutionContext) => {
  const invalidRequestWithoutUserid = cloneDeep(validRequest)
  delete invalidRequestWithoutUserid.userid
  const req = mockRequest(invalidRequestWithoutUserid)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getExerciseHistory returns error when workoutname is missing', async (t: ExecutionContext) => {
  const invalidRequestWithoutNameofexercise = cloneDeep(validRequest)
  delete invalidRequestWithoutNameofexercise.nameofexercise
  const req = mockRequest(invalidRequestWithoutNameofexercise)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getExerciseHistory with no completed workouts results in empty graph labels', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Workout Plan'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validRequestWithExistingNameOfExercise = cloneDeep(validRequest)
  validRequestWithExistingNameOfExercise.nameofexercise = 'Jog'
  const req = mockRequest(validRequestWithExistingNameOfExercise)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getExerciseHistory: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Exercise has never been performed' }))
})

test.serial('getExerciseHistory with a completed workout for strength/muscle exercise results in correct graphLabels returned', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Completed Workout'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const validRequestWithExistingNameOfExercise = cloneDeep(validRequest)
  validRequestWithExistingNameOfExercise.nameofexercise = `Test Curl ${uuid}`
  const req = mockRequest(validRequestWithExistingNameOfExercise)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getExerciseHistory: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Success!')
  t.true(argsPassed.type === 'muscle/strength')
  t.true(JSON.stringify(argsPassed.data.arrayOfWeightPulled) === JSON.stringify([276]))
  t.log(`argsPassed.arraysOfDates: ${JSON.stringify(argsPassed.arrayOfDates)}`)
  t.true(JSON.stringify(argsPassed.arrayOfDates) === JSON.stringify([[getTodaysDate()]]))
})

test.serial('getExerciseHistory with a completed workout for cardio exercise results in correct graphLabels returned', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Completed Workout'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const validRequestWithExistingNameOfExercise = cloneDeep(validRequest)
  validRequestWithExistingNameOfExercise.nameofexercise = `Slow Jog ${uuid}`
  const req = mockRequest(validRequestWithExistingNameOfExercise)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in last getExerciseHistory: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Success!')
  t.true(argsPassed.type === 'Other')
})

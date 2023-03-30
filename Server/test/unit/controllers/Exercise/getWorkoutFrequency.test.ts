import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { getWorkoutFrequency } from '../../../../routes/Exercise/completedWorkouts.controller'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
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
interface getWorkoutFrequencyRequest {
  userid?: string
}
const validRequest: getWorkoutFrequencyRequest = {
  userid: uuid
}
test.serial('getWorkoutFrequency returns error when userid is missing', async (t: any) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getWorkoutFrequency(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})
test.serial('getWorkoutFrequency with user with no workouts results in success and empty arrays', async (t: any) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutFrequency(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getWorkoutFrequency: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', graphLabels: [], graphData: [] }))
})

test.serial('getWorkoutFrequency with user with 1 workout returns array of size 1', async (t: any) => {
  const nameOfWorkout = 'Workout Plan 1'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutFrequency(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getWorkoutFrequency 1 workout: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', graphLabels: [nameOfWorkout], graphData: [1] }))
})

test.serial('getWorkoutFrequency with user with 2 workouts returns correct graph labels and data', async (t: any) => {
  const nameOfWorkout = 'Workout Plan 2'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutFrequency(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getWorkoutFrequency 2 workout: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', graphLabels: ['Workout Plan 1', nameOfWorkout], graphData: [1, 1] }))
})

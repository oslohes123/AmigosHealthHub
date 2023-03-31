import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import sinon from 'sinon'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getAllWorkoutNames } from '../../../../routes/Exercise/getWorkout.controller'
import setUpWorkoutPlan from '../../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/Exercise/deleteWorkoutPlans'

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
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
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

interface getAllWorkoutNamesRequest {
  userid?: string
}
const validRequest: getAllWorkoutNamesRequest = {
  userid: uuid
}

test.serial('getAllWorkoutNames results in error when userid is missing', async (t: any) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const req = mockRequest(invalidReqWithNoUserid)
  const res = mockResponse()
  await getAllWorkoutNames(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getAllWorkoutNames with userid with no workouts results in ', async (t: any) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getAllWorkoutNames(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getAllWorkoutNames: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', arrayOfAllWorkouts: [] }))
})
// test with user with a workout
test.serial('getAllWorkoutNames with userid with a workout results in ', async (t: any) => {
  const nameOfWorkout = 'Test Workout'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getAllWorkoutNames(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getAllWorkoutNames: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', arrayOfAllWorkouts: [nameOfWorkout] }))
})

test.serial('getAllWorkoutNames with userid with 2 workouts results in success', async (t: any) => {
  const nameOfWorkout = 'Test Workout 2'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getAllWorkoutNames(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getAllWorkoutNames: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', arrayOfAllWorkouts: ['Test Workout', nameOfWorkout] }))
})

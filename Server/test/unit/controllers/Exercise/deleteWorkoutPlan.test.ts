import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword } from '../../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import setUpWorkoutPlan from '../../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteWorkoutPlan } from '../../../../routes/Exercise/createWorkout.controller'
import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/Exercise/deleteWorkoutPlans'
import { matchWorkoutPlanAndUser } from '../../../../utils/Exercise/exerciseFunctions'

let randomEmail: string
const uuid = uuidv4()
test.before(async (t: ExecutionContext) => {
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

test.after.always('guaranteed cleanup of user and delete exercises', async (t: ExecutionContext) => {
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
    body: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
interface deleteWorkoutPlanRequest {
  userid?: string
  workoutname?: string
}
const validRequest: deleteWorkoutPlanRequest = {
  userid: uuid,
  workoutname: 'Test Track Workout Name'
}

test.serial('deleteWorkoutPlan results in error when userid is missing', async (t: ExecutionContext) => {
  const invalidReqWithNouserid = cloneDeep(validRequest)
  delete invalidReqWithNouserid.userid
  const req = mockRequest(invalidReqWithNouserid)
  const res = mockResponse()
  await deleteWorkoutPlan(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('deleteWorkoutPlan results in error when workoutname is missing', async (t: ExecutionContext) => {
  const invalidReqWithNoWorkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoWorkoutname.workoutname
  const req = mockRequest(invalidReqWithNoWorkoutname)
  const res = mockResponse()
  await deleteWorkoutPlan(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('deleteWorkoutPlan with non-existent workoutplan results in error', async (t: ExecutionContext) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await deleteWorkoutPlan(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'User does not have a plan of that name!' }))
})

test.serial('deleteWorkoutPlan with valid workout plan results in success', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Cannot create a Workoutplan with same name'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validReqWithDiffWorkoutName = cloneDeep(validRequest)
  validReqWithDiffWorkoutName.workoutname = nameOfWorkout
  const req = mockRequest(validReqWithDiffWorkoutName)
  const res = mockResponse()
  await deleteWorkoutPlan(req as Request, res as Response)
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, nameOfWorkout)
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }

  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: `Workout Plan ${String(nameOfWorkout)} Deleted!` }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 0)
})

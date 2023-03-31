import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import setUpWorkoutPlan from '../../../../utils/Exercise/setUpWorkoutPlanForTests'
import { getWorkoutDetails } from '../../../../routes/Exercise/getWorkout.controller'
import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/Exercise/deleteWorkoutPlans'
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
    headers: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

interface getWorkoutDetailsRequest {
  userid?: string
  workoutname?: string
}
const validRequest: getWorkoutDetailsRequest = {
  userid: uuid,
  workoutname: 'Test Workout Plan'
}

// test getWorkoutDetails with no userid/workouname
test.serial('getWorkoutDetails results in error when userid is missing', async (t: ExecutionContext) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const req = mockRequest(invalidReqWithNoUserid)
  const res = mockResponse()
  await getWorkoutDetails(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getWorkoutDetails results in error when workoutname is missing', async (t: ExecutionContext) => {
  const invalidReqWithNoWorkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoWorkoutname.workoutname
  const req = mockRequest(invalidReqWithNoWorkoutname)
  const res = mockResponse()
  await getWorkoutDetails(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getWorkoutDetails with userid with no workouts', async (t: ExecutionContext) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getWorkoutDetails(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: "User doesn't have a workout of that name!" }))
})

test.serial('getWorkoutDetails with userid with a workout results in a success', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Workout'
  const validAndCorrectReq = cloneDeep(validRequest)
  validAndCorrectReq.workoutname = nameOfWorkout
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const req = mockRequest(validAndCorrectReq)
  const res = mockResponse()
  await getWorkoutDetails(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Success!')
  t.true(argsPassed.workoutToReturn.length === 1)
})

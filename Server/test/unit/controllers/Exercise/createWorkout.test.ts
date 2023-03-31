import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import sinon from 'sinon'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import setUpWorkoutPlan from '../../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteAllWorkoutPlansWithExercises } from '../../../../utils/Exercise/deleteWorkoutPlans'
import { createWorkout } from '../../../../routes/Exercise/createWorkout.controller'
import { matchWorkoutPlanAndUser } from '../../../../utils/Exercise/exerciseFunctions'

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
    body: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

interface createWorkoutRequest {
  userid?: string
  workoutname?: string
  exercises?: object[]
}
const validRequest: createWorkoutRequest = {
  userid: uuid,
  workoutname: 'Test Workoutplan',
  exercises: [{}]
}

test.serial('createWorkout results in error when userid is missing', async (t: any) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const req = mockRequest(invalidReqWithNoUserid)
  const res = mockResponse()
  await createWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('createWorkout results in error when workoutname is missing', async (t: any) => {
  const invalidReqWithNoworkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoworkoutname.workoutname
  const req = mockRequest(invalidReqWithNoworkoutname)
  const res = mockResponse()
  await createWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('createWorkout results in error when exercises is missing', async (t: any) => {
  const invalidReqWithNoExercises = cloneDeep(validRequest)
  delete invalidReqWithNoExercises.exercises
  const req = mockRequest(invalidReqWithNoExercises)
  const res = mockResponse()
  await createWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('createWorkout results in success with valid inputs', async (t: any) => {
  validRequest.exercises = [
    {
      sets: null,
      weight: null,
      warmUpSet: false,
      reps: null,
      calories: '50',
      distance: '5000',
      duration: '60',
      name: 'Jog',
      muscle: 'Legs',
      difficulty: 'Beginner',
      instructions: '',
      equipment: 'body_only',
      type: 'cardio'
    }
  ]
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await createWorkout(req as Request, res as Response)
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, 'Test Workoutplan')
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Successfully created a workout plan!' }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 1)
})

test.serial('createWorkout results in error when trying to create another workoutplan with the same name', async (t: any) => {
  const nameOfWorkout = 'Test Cannot create a Workoutplan with same name'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validReqWithSameWorkoutname = cloneDeep(validRequest)
  validReqWithSameWorkoutname.exercises = [
    {
      sets: null,
      weight: null,
      warmUpSet: false,
      reps: null,
      calories: '50',
      distance: '5000',
      duration: '60',
      name: 'Jog',
      muscle: 'Legs',
      difficulty: 'Beginner',
      instructions: '',
      equipment: 'body_only',
      type: 'cardio'
    }
  ]
  validReqWithSameWorkoutname.workoutname = nameOfWorkout
  const req = mockRequest(validReqWithSameWorkoutname)
  const res = mockResponse()
  await createWorkout(req as Request, res as Response)
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, nameOfWorkout)
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'A workout of the same name already belongs to the user' }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 1)
})

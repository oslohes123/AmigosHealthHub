import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/User/userFunctions'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { getAllExercises } from '../../../../routes/Exercise/exerciseHistory.controller'

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
    headers: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
interface getAllExercisesRequest {
  userid?: string
}
const validRequest: getAllExercisesRequest = {
  userid: uuid
}

test.serial('getAllExercises results in error when userid is missing', async (t: ExecutionContext) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.userid
  const req = mockRequest(cloneValidRequest)
  const res = mockResponse()
  await getAllExercises(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getAllExercises results in empty arrayOfExerciseNames when userid has no completed workouts', async (t: ExecutionContext) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getAllExercises(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', arrayOfExerciseNames: [] }))
})

test.serial('getAllExercises results in populated arrayOfExerciseNames when userid has completed workouts', async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Completed Workout'
  const req = mockRequest(validRequest)
  const res = mockResponse()
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  await getAllExercises(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  const argsPassed = res.json.getCall(0).args[0]
  t.true(argsPassed.mssg === 'Success!')
  t.true(argsPassed.arrayOfExerciseNames.includes(`Test Curl ${uuid}`))
  t.true(argsPassed.arrayOfExerciseNames.includes(`Slow Jog ${uuid}`))
})

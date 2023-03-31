import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/User/userFunctions'
import { getCaloriesToday } from '../../../../routes/Exercise/exerciseCalories.controller'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
let randomEmail: string
const uuid = uuidv4()
test.before(async (t: ExecutionContext) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Calories',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
})

test.after.always('guaranteed cleanup of user', async (t: ExecutionContext) => {
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

test.serial('getCaloriesToday with no userid provided should return error', async (t: ExecutionContext) => {
  const req = mockRequest({})
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test.serial('user with no workouts has burnt 0 calories', async (t: ExecutionContext) => {
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'User has no workouts!', totalCaloriesBurnt: 0 }))
})

test.serial('getCaloriesToday with user with a valid workoutplan returns the correct number of calories burnt', async (t: ExecutionContext) => {
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success', totalCaloriesBurnt: 1000 }))
  // delete all workoutplans
})

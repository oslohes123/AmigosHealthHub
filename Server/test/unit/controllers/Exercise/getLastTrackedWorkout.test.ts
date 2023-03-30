import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import sinon from 'sinon'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getLastTrackedWorkout } from '../../../../routes/Exercise/completedWorkouts.controller'
// import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { cloneDeep } from 'lodash'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
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
    headers: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
interface getLastTrackedWorkoutRequest {
  userid?: string
}
const validRequest: getLastTrackedWorkoutRequest = {
  userid: uuid
}
test('getLastTrackedWorkout with missing userid results in error', async (t: any) => {
  const invalidRequestWithNoUserid = cloneDeep(validRequest)
  delete invalidRequestWithNoUserid.userid
  const req = mockRequest(invalidRequestWithNoUserid)
  const res = mockResponse()
  await getLastTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getLastTrackedWorkout with userid with no workouts results in success returns no tracked workouts', async (t: any) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getLastTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', lastTrackedWorkout: 'No Tracked Workouts' }))
})

test.serial('getLastTrackedWorkout with userid a workout results in correct last tracked workout returned', async (t: any) => {
  const nameOfWorkout = `${uuid}'s FIRST workout`
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getLastTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', lastTrackedWorkout: nameOfWorkout }))
})

test.serial('getLastTrackedWorkout with userid with muliple workouts results in correct last tracked workout returned', async (t: any) => {
  const nameOfWorkout = `${uuid}'s SECOND workout`
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getLastTrackedWorkout(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Success!', lastTrackedWorkout: nameOfWorkout }))
})

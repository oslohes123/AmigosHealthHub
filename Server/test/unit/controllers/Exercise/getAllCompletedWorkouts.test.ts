import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import sinon from 'sinon'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getAllCompletedWorkouts } from '../../../../routes/Exercise/completedWorkouts.controller'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
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
// test for missing userid results in error
test.serial('getAllCompletedWorkouts with missing userid results in error', async (t: any) => {
  const req = mockRequest({})
  const res = mockResponse()
  await getAllCompletedWorkouts(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getAllCompletedWorkouts: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})
// test with user with no workouts
test.serial('getAllCompletedWorkouts with no workouts returns success and empty array', async (t: any) => {
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  t.log(`req in unit getAllCompletedWorkouts: ${JSON.stringify(req)}`)
  await getAllCompletedWorkouts(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(res.status.calledWith(200))
  t.log(`argsPassed in getAllCompletedWorkouts: ${JSON.stringify(argsPassed)}`)
  t.true(argsPassed.mssg === 'Got All Completed Workouts!')
  t.true(JSON.stringify(argsPassed.workoutsNamesAndDates) === '[]')
})
// test with user with some workouts and that workout history is ordered
test.serial('getAllCompletedWorkouts with workouts returns success and ordered array by time', async (t: any) => {
  const nameOfWorkout = 'Test Tracked Workout'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getAllCompletedWorkouts(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.true(res.status.calledWith(200))
  t.log(`argsPassed in last test of getAllCompletedWorkouts: ${JSON.stringify(argsPassed)}`)
  t.true(argsPassed.mssg === 'Got All Completed Workouts!')
  t.true(argsPassed.workoutsNamesAndDates.length === 1)
  t.true(argsPassed.workoutsNamesAndDates[0].workoutname === 'Test Tracked Workout')
})

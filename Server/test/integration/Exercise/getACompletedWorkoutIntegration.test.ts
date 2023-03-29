import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createToken, createUserWithID, deleteUserRow } from '../../../utils/userFunctions'
import { getTime, getDate } from '../../../utils/convertTimeStamptz'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import RouteNamesClass from '../../../utils/routeNamesClass'
import test from 'ava'
import request from 'supertest'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
const routeNames = new RouteNamesClass()
const getACompletedWorkoutRoute = routeNames.fullGetCompletedWorkoutURL

const uuid = uuidv4()
const randomEmail = `${uuid}@example.com`
let token: string
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
  token = createToken(uuid)
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

test.serial(`GET ${getACompletedWorkoutRoute}  with missing userid returns error`, async (t: any) => {
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, workoutname: 'Test Workout', date: '2023-05-13', time: '18:55:33' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test(`GET ${getACompletedWorkoutRoute}  with missing workoutname returns error`, async (t: any) => {
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: uuid, date: '2023-05-13', time: '18:55:33' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test(`GET ${getACompletedWorkoutRoute}  with missing date returns error`, async (t: any) => {
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: uuid, workoutname: 'Test Workout', time: '18:55:33' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test(`GET ${getACompletedWorkoutRoute}  with missing time returns error`, async (t: any) => {
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: uuid, workoutname: 'Test Workout', date: '2023-05-13' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})

test(`GET ${getACompletedWorkoutRoute}  withuserid who does not exist returns error`, async (t: any) => {
  const fakeUserID = uuidv4()
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: fakeUserID, workoutname: 'Test Workout', date: '2023-05-13', time: '18:33:22' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})

test(`GET ${getACompletedWorkoutRoute}with user has does not have a workout at the given time and date returns error`, async (t: any) => {
  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: uuid, workoutname: 'Test Workout', date: '2023-05-13', time: '18:33:22' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})

test(`GET ${getACompletedWorkoutRoute} with created completed workout returns success`, async (t: any) => {
  const nameOfWorkout = 'Test Tracked Workout'
  const timeOfCreationOfWorkout = '2006-03-26T13:28:10+00:00'
  const dateOfCreationOfWorkout = getDate(timeOfCreationOfWorkout)
  const timeOfCreation = getTime(timeOfCreationOfWorkout)
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout, timeOfCreationOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }

  const response = await request(app)
    .get(getACompletedWorkoutRoute)
    .set({ authorization: token, userid: uuid, workoutname: 'Test Tracked Workout', date: dateOfCreationOfWorkout, time: timeOfCreation })

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body.mssg) === JSON.stringify('Success!'))
})

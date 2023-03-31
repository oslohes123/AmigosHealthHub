import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { getTime, getTodaysDate, getDate } from '../../../utils/convertTimeStamptz'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
const routeNames = new RouteNamesClass()
const deleteTrackedWorkoutRoute = routeNames.fullDeleteCompletedWorkoutURL
let randomEmail: string
const uuid = uuidv4()
let token: string
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
  token = createToken(uuid)
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

interface deleteTrackedWorkoutRequest {
  userid?: string
  workoutname?: string
  time?: string
  date?: string
}
const validRequest: deleteTrackedWorkoutRequest = {
  userid: uuid,
  workoutname: 'Test Track Workout Name',
  time: '18:03:23',
  date: getTodaysDate()
}
test('deleteTrackedWorkout route is correct', (t: ExecutionContext) => {
  t.true(deleteTrackedWorkoutRoute === '/api/user/completedWorkouts/delete')
})
// Test deleteTrackedWorkout with missing userid/workoutname/date/time

test(`DELETE ${deleteTrackedWorkoutRoute} results in error when userid is missing`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid

  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(invalidRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test(`DELETE ${deleteTrackedWorkoutRoute} results in error when workoutname is missing`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.workoutname
  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(invalidRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test(`DELETE ${deleteTrackedWorkoutRoute} results in error when date is missing`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.date
  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(invalidRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test(`DELETE ${deleteTrackedWorkoutRoute} results in error when time is missing`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.time
  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(invalidRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`DELETE ${deleteTrackedWorkoutRoute} results in error when user has no completed workouts`, async (t: ExecutionContext) => {
  const fakeWorkoutRequest = cloneDeep(validRequest)

  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(fakeWorkoutRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'User does not have any completed workouts!' }))
})

test.serial(`DELETE ${deleteTrackedWorkoutRoute} results in success when given correct workout details`, async (t: ExecutionContext) => {
  const nameOfWorkout = validRequest.workoutname
  const timestampOfCreationOfWorkout = '2006-03-26T13:28:10+00:00'
  const dateOfCreationOfWorkout = getDate(timestampOfCreationOfWorkout)
  const timeOfCreationOfWorkout = getTime(timestampOfCreationOfWorkout)
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout, timestampOfCreationOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const validWorkoutRequest = cloneDeep(validRequest)
  validWorkoutRequest.date = dateOfCreationOfWorkout
  validWorkoutRequest.time = timeOfCreationOfWorkout

  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(validWorkoutRequest)

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: `Success deleting trackedWorkout ${String(validWorkoutRequest.workoutname)}!` }))
})

test.serial(`DELETE ${deleteTrackedWorkoutRoute} results in error when user has workout of the same name but at a different given time/date`, async (t: ExecutionContext) => {
  const nameOfWorkout = validRequest.workoutname
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const incorrectWorkoutRequest = cloneDeep(validRequest)

  const response = await request(app)
    .delete(deleteTrackedWorkoutRoute)
    .set({ authorization: token })
    .send(incorrectWorkoutRequest)

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'A workout of this name at this time and date does not exist for this user!' }))
})

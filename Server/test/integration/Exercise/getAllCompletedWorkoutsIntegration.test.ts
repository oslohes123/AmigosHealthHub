import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import { createHashedPassword, createUserWithID, deleteUserRow, createToken } from '../../../utils/User/userFunctions'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
const routeNames = new RouteNamesClass()
const getAllCompletedWorkoutsRoute = routeNames.fullGetAllCompletedWorkoutURL
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
test('getAllCompletedWorkoutsRoute is correct', (t: ExecutionContext) => {
  t.true(getAllCompletedWorkoutsRoute === '/api/user/completedWorkouts/getAll')
})
// test for missing userid results in error
test.serial(`GET ${getAllCompletedWorkoutsRoute} with missing userid results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getAllCompletedWorkoutsRoute)
    .set({ authorization: token })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance was invalid against its schema' }))
})
// test with user with no workouts
test.serial(`GET ${getAllCompletedWorkoutsRoute}with no workouts returns success and empty array`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getAllCompletedWorkoutsRoute)
    .set({ authorization: token, userid: uuid })

  t.true(response.status === 200)
  t.true(response.body.mssg === 'Got All Completed Workouts!')
  t.true(JSON.stringify(response.body.workoutsNamesAndDates) === '[]')
})
// test with user with some workouts and that workout history is ordered
test.serial(`GET ${getAllCompletedWorkoutsRoute} with workouts returns success and ordered array by time`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Tracked Workout'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const res = await request(app)
    .get(getAllCompletedWorkoutsRoute)
    .set({ authorization: token, userid: uuid })

  t.true(res.status === 200)
  t.true(res.body.mssg === 'Got All Completed Workouts!')
  t.true(res.body.workoutsNamesAndDates.length === 1)
  t.true(res.body.workoutsNamesAndDates[0].workoutname === 'Test Tracked Workout')
})

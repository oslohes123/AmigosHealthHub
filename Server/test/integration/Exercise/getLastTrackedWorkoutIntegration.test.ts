import app from '../../../index'
import test from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow, createToken } from '../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
import RouteNamesClass from '../../../utils/routeNamesClass'
const routeNames = new RouteNamesClass()
const getLastTrackedWorkoutRoute = routeNames.fullLastTrackedWorkoutURL

let randomEmail: string
let token: string
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
  token = createToken(uuid)
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

interface getLastTrackedWorkoutRequest {
  userid?: string
}
const validRequest: getLastTrackedWorkoutRequest = {
  userid: uuid
}
test('getLastTrackedWorkout route is correct', (t: any) => {
  t.true(getLastTrackedWorkoutRoute === '/api/user/completedWorkouts/lastTrackedWorkout')
})
test(`GET ${getLastTrackedWorkoutRoute} with missing userid results in error`, async (t: any) => {
  const invalidRequestWithNoUserid = cloneDeep(validRequest)
  delete invalidRequestWithNoUserid.userid
  const response = await request(app)
    .get(getLastTrackedWorkoutRoute)
    .set({ authorization: token, ...invalidRequestWithNoUserid })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getLastTrackedWorkoutRoute} with userid with no workouts results in success returns no tracked workouts`, async (t: any) => {
  const response = await request(app)
    .get(getLastTrackedWorkoutRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', lastTrackedWorkout: 'No Tracked Workouts' }))
})

test.serial(`GET ${getLastTrackedWorkoutRoute} with userid a workout results in correct last tracked workout returned`, async (t: any) => {
  const nameOfWorkout = `${uuid}'s FIRST workout`
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getLastTrackedWorkoutRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', lastTrackedWorkout: nameOfWorkout }))
})

test.serial(`GET ${getLastTrackedWorkoutRoute} with userid with muliple workouts results in correct last tracked workout returned`, async (t: any) => {
  const nameOfWorkout = `${uuid}'s SECOND workout`
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getLastTrackedWorkoutRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', lastTrackedWorkout: nameOfWorkout }))
})

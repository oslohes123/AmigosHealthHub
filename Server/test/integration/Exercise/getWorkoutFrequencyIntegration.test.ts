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
const getWorkoutFrequencyRoute = routeNames.fullGetWorkoutFrequencyURL
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

interface getWorkoutFrequencyRequest {
  userid?: string
}
const validRequest: getWorkoutFrequencyRequest = {
  userid: uuid
}
test('getWorkoutFrequency route is correct', (t: any) => {
  t.true(getWorkoutFrequencyRoute === '/api/user/completedWorkouts/workoutFreq')
})
test.serial(`GET ${getWorkoutFrequencyRoute} returns error when userid is missing`, async (t: any) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid

  const response = await request(app)
    .get(getWorkoutFrequencyRoute)
    .set({ authorization: token, ...invalidRequest })

  t.log(`response in getWorkoutFreq integration test: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})
test.serial(`GET ${getWorkoutFrequencyRoute} with user with no workouts results in success and empty arrays`, async (t: any) => {
  const response = await request(app)
    .get(getWorkoutFrequencyRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: [], graphData: [] }))
})

test.serial(`GET ${getWorkoutFrequencyRoute} with user with 1 workout returns array of size 1`, async (t: any) => {
  const nameOfWorkout = 'Workout Plan 1'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getWorkoutFrequencyRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: [nameOfWorkout], graphData: [1] }))
})

test.serial(`GET ${getWorkoutFrequencyRoute} with user with 2 workouts returns correct graph labels and data`, async (t: any) => {
  const nameOfWorkout = 'Workout Plan 2'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getWorkoutFrequencyRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: ['Workout Plan 1', nameOfWorkout], graphData: [1, 1] }))
})

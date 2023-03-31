import test from 'ava'
import { type ExecutionContext } from 'ava'
import app from '../../../index'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow, createToken } from '../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
import RouteNamesClass from '../../../utils/routeNamesClass'
const routeNames = new RouteNamesClass()
const getActualExerciseTypeFrequencyRoute = routeNames.fullGetExerciseTypeFrequencyURL
const uuid = uuidv4()
const randomEmail = `${uuid}@example.com`
let token: string
test.before(async (t: ExecutionContext) => {
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
test.after.always(async (t: ExecutionContext) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail('Deleting user went wrong!')
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})

interface getActualExerciseTypeRequest {
  userid?: string
}
const validRequest: getActualExerciseTypeRequest = {
  userid: uuid
}
test('getActualExerciseTypeFrequency route is correct', (t: ExecutionContext) => {
  t.true(getActualExerciseTypeFrequencyRoute === '/api/user/completedWorkouts/exerciseTypeFreq')
})

test.serial(`GET ${getActualExerciseTypeFrequencyRoute} returns error when userid is missing`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid
  const response = await request(app)
    .get(getActualExerciseTypeFrequencyRoute)
    .set({ authorization: token, ...invalidRequest })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getActualExerciseTypeFrequencyRoute} returns empty arrays when user has no completed workouts`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getActualExerciseTypeFrequencyRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: [], graphData: [] }))
})

test.serial(`GET ${getActualExerciseTypeFrequencyRoute} with user with 1 workout returns array of size 1`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Workout Plan 1'
  // Adds exercises of names: `Slow Jog ${uuid}` and [`Test Curl ${uuid}`
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getActualExerciseTypeFrequencyRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: ['strength', 'cardio'], graphData: [1, 1] }))
})

test.serial(`GET ${getActualExerciseTypeFrequencyRoute} with user with 2 workouts returns correct graph labels and data`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Workout Plan 2'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getActualExerciseTypeFrequencyRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', graphLabels: ['strength', 'cardio'], graphData: [2, 2] }))
})

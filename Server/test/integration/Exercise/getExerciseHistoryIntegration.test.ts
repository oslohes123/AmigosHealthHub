import app from '../../../index'
import test from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { deleteAllWorkoutPlansWithExercises } from '../../../utils/Exercise/deleteWorkoutPlans'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { cloneDeep } from 'lodash'
import setUpWorkoutPlan from '../../../utils/Exercise/setUpWorkoutPlanForTests'
const routeNames = new RouteNamesClass()
const getExerciseHistoryRoute = routeNames.fullGetExerciseHistoryURL

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
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail('Deleting user went wrong!')
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})

interface getExerciseHistoryRequest {
  userid?: string
  nameofexercise?: string
}
const validRequest: getExerciseHistoryRequest = {
  userid: uuid,
  nameofexercise: `Random ${uuid} exercise`
}
test.serial('getExerciseHistoryRoute is correct', (t: any) => {
  t.true(getExerciseHistoryRoute === '/api/user/exercise/history')
})
test.serial(`GET ${getExerciseHistoryRoute} returns error when userid is missing`, async (t: any) => {
  const invalidRequestWithoutUserid = cloneDeep(validRequest)
  delete invalidRequestWithoutUserid.userid

  const response = await request(app)
    .get(getExerciseHistoryRoute)
    .set({ authorization: token, ...invalidRequestWithoutUserid })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getExerciseHistoryRoute} returns error when workoutname is missing`, async (t: any) => {
  const invalidRequestWithoutNameofexercise = cloneDeep(validRequest)
  delete invalidRequestWithoutNameofexercise.nameofexercise
  const response = await request(app)
    .get(getExerciseHistoryRoute)
    .set({ authorization: token, ...invalidRequestWithoutNameofexercise })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getExerciseHistoryRoute} with no completed workouts results in empty graph labels`, async (t: any) => {
  const nameOfWorkout = 'Test Workout Plan'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validRequestWithExistingNameOfExercise = cloneDeep(validRequest)
  validRequestWithExistingNameOfExercise.nameofexercise = 'Jog'
  const response = await request(app)
    .get(getExerciseHistoryRoute)
    .set({ authorization: token, ...validRequestWithExistingNameOfExercise })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Exercise has never been performed' }))
})

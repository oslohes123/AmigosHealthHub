import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import request from 'supertest'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow, createToken } from '../../../utils/userFunctions'
import setUpWorkoutPlan from '../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteAllWorkoutPlansWithExercises } from '../../../utils/Exercise/deleteWorkoutPlans'
import RouteNamesClass from '../../../utils/routeNamesClass'
const routeNames = new RouteNamesClass()
const getAllWorkoutNamesRoute = routeNames.fullGetAllWorkoutNamesURL

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
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

interface getAllWorkoutNamesRequest {
  userid?: string
}
const validRequest: getAllWorkoutNamesRequest = {
  userid: uuid
}
test.serial('getAllWorkoutNames route is correct', (t: any) => {
  t.true(getAllWorkoutNamesRoute === '/api/user/workout/getAllWorkoutNames')
})
test.serial(`GET ${getAllWorkoutNamesRoute} results in error when userid is missing`, async (t: any) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const response = await request(app)
    .get(getAllWorkoutNamesRoute)
    .set({ authorization: token, ...invalidReqWithNoUserid })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getAllWorkoutNamesRoute} with userid with no workouts results in error`, async (t: any) => {
  const response = await request(app)
    .get(getAllWorkoutNamesRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', arrayOfAllWorkouts: [] }))
})
// test with user with a workout
test.serial(`GET ${getAllWorkoutNamesRoute} with userid with a workout results in success`, async (t: any) => {
  const nameOfWorkout = 'Test Workout'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const response = await request(app)
    .get(getAllWorkoutNamesRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', arrayOfAllWorkouts: [nameOfWorkout] }))
})

test.serial(`GET ${getAllWorkoutNamesRoute} with userid with 2 workouts results in success`, async (t: any) => {
  const nameOfWorkout = 'Test Workout 2'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const response = await request(app)
    .get(getAllWorkoutNamesRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', arrayOfAllWorkouts: ['Test Workout', nameOfWorkout] }))
})

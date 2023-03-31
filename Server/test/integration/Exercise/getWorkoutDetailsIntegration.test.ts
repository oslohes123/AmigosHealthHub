import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { cloneDeep } from 'lodash'
import { createHashedPassword, createUserWithID, deleteUserRow, createToken } from '../../../utils/User/userFunctions'
import setUpWorkoutPlan from '../../../utils/Exercise/setUpWorkoutPlanForTests'
import { deleteAllWorkoutPlansWithExercises } from '../../../utils/Exercise/deleteWorkoutPlans'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
const routeNames = new RouteNamesClass()
const getWorkoutDetailsRoute = routeNames.fullGetWorkoutURL

let randomEmail: string
let token: string
const uuid = uuidv4()
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
  const { errorPresent } = await deleteAllWorkoutPlansWithExercises(uuid)
  if (errorPresent) {
    t.fail(errorPresent)
  }
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

interface getWorkoutDetailsRequest {
  userid?: string
  workoutname?: string
}
const validRequest: getWorkoutDetailsRequest = {
  userid: uuid,
  workoutname: 'Test Workout Plan'
}

test.serial('getWorkoutDetails route is correct', (t: ExecutionContext) => {
  t.true(getWorkoutDetailsRoute === '/api/user/workout/get')
})

test.serial(`GET ${getWorkoutDetailsRoute} results in error when userid is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const response = await request(app)
    .get(getWorkoutDetailsRoute)
    .set({ authorization: token, ...invalidReqWithNoUserid })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getWorkoutDetailsRoute} results in error when workoutname is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoWorkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoWorkoutname.workoutname
  const response = await request(app)
    .get(getWorkoutDetailsRoute)
    .set({ authorization: token, ...invalidReqWithNoWorkoutname })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getWorkoutDetailsRoute} with userid with no workouts`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getWorkoutDetailsRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "User doesn't have a workout of that name!" }))
})

test.serial(`GET ${getWorkoutDetailsRoute} with userid with a workout results in a success`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Workout'
  const validAndCorrectReq = cloneDeep(validRequest)
  validAndCorrectReq.workoutname = nameOfWorkout
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const response = await request(app)
    .get(getWorkoutDetailsRoute)
    .set({ authorization: token, ...validAndCorrectReq })

  t.true(response.status === 200)
  t.true(response.body.mssg === 'Success!')
  t.true(response.body.workoutToReturn.length === 1)
})

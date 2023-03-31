import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/User/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import { deleteAllWorkoutPlansWithExercises } from '../../../utils/Exercise/deleteWorkoutPlans'
import { matchWorkoutPlanAndUser } from '../../../utils/Exercise/exerciseFunctions'
import setUpWorkoutPlan from '../../../utils/Exercise/setUpWorkoutPlanForTests'
const routeNames = new RouteNamesClass()
const createWorkoutRoute = routeNames.fullAddWorkoutURL

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

interface createWorkoutRequest {
  userid?: string
  workoutname?: string
  exercises?: object[]
}
const validRequest: createWorkoutRequest = {
  userid: uuid,
  workoutname: 'Test Workoutplan',
  exercises: [{}]
}
test('createWorkoutRoute is correct', (t: ExecutionContext) => {
  t.true(createWorkoutRoute === '/api/user/workout/add')
})
test.serial(`POST ${createWorkoutRoute} results in error when userid is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoUserid = cloneDeep(validRequest)
  delete invalidReqWithNoUserid.userid
  const response = await request(app)
    .post(createWorkoutRoute)
    .set({ authorization: token })
    .send({ ...invalidReqWithNoUserid })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`POST ${createWorkoutRoute} results in error when workoutname is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoworkoutname = cloneDeep(validRequest)
  delete invalidReqWithNoworkoutname.workoutname
  const response = await request(app)
    .post(createWorkoutRoute)
    .set({ authorization: token })
    .send({ ...invalidReqWithNoworkoutname })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`POST ${createWorkoutRoute} results in error when exercises is missing`, async (t: ExecutionContext) => {
  const invalidReqWithNoExercises = cloneDeep(validRequest)
  delete invalidReqWithNoExercises.exercises
  const response = await request(app)
    .post(createWorkoutRoute)
    .set({ authorization: token })
    .send({ ...invalidReqWithNoExercises })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`POST ${createWorkoutRoute} results in success with valid inputs`, async (t: ExecutionContext) => {
  const validRequestWithValidInputs = cloneDeep(validRequest)
  validRequestWithValidInputs.exercises = [
    {
      sets: null,
      weight: null,
      warmUpSet: false,
      reps: null,
      calories: '50',
      distance: '5000',
      duration: '60',
      name: 'Jog',
      muscle: 'Legs',
      difficulty: 'Beginner',
      instructions: '',
      equipment: 'body_only',
      type: 'cardio'
    }
  ]
  const response = await request(app)
    .post(createWorkoutRoute)
    .set({ authorization: token })
    .send({ ...validRequestWithValidInputs })
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, 'Test Workoutplan')
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Successfully created a workout plan!' }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 1)
})

test.serial(`POST ${createWorkoutRoute} results in error when trying to create another workoutplan with the same name`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Cannot create a Workoutplan with same name'
  const { errorsSettingUpWorkoutPlan, success } = await setUpWorkoutPlan(uuid, nameOfWorkout)
  if (errorsSettingUpWorkoutPlan || !success) {
    t.fail(errorsSettingUpWorkoutPlan)
  }
  const validReqWithSameWorkoutname = cloneDeep(validRequest)
  validReqWithSameWorkoutname.exercises = [
    {
      sets: null,
      weight: null,
      warmUpSet: false,
      reps: null,
      calories: '50',
      distance: '5000',
      duration: '60',
      name: 'Jog',
      muscle: 'Legs',
      difficulty: 'Beginner',
      instructions: '',
      equipment: 'body_only',
      type: 'cardio'
    }
  ]
  validReqWithSameWorkoutname.workoutname = nameOfWorkout
  const response = await request(app)
    .post(createWorkoutRoute)
    .set({ authorization: token })
    .send({ ...validReqWithSameWorkoutname })
  const { dataMatchingWorkoutPlanAndUser, errorMatchingWorkoutPlanAndUser } = await matchWorkoutPlanAndUser(uuid, nameOfWorkout)
  if (errorMatchingWorkoutPlanAndUser) {
    t.fail('matchWorkoutPlanAndUser failed!')
  }
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'A workout of the same name already belongs to the user' }))
  t.true(dataMatchingWorkoutPlanAndUser.length === 1)
})

import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/userFunctions'
import { selectAllActualExercises, selectAllCompletedWorkoutNames, selectAllTrackedWorkoutsWithExercises } from '../../../utils/Exercise/exerciseFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
const routeNames = new RouteNamesClass()

const addCompletedWorkoutRoute = routeNames.fullAddCompletedWorkoutURL
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
})

const exercisesWorkoutPlan = [
  {
    name: 'Machine Bicep Curl',
    sets: 3,
    distance: null,
    duration: null,
    warmUpSet: false,
    weight: [12, 12, 12],
    reps: [12, 6, 5],
    calories: 50
  },
  {
    name: 'Slow Jog',
    sets: null,
    weight: null,
    warmUpSet: false,
    reps: null,
    calories: 50,
    distance: 5000,
    duration: 23.00
  }
]
test('addCompletedWorkoutRoute is correct', (t: ExecutionContext) => {
  t.true(addCompletedWorkoutRoute === '/api/user/completedWorkouts/add')
})
// test for missing userid results in error
test(`POST ${addCompletedWorkoutRoute} with missing userid results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(addCompletedWorkoutRoute)
    .set({ authorization: token })
    .send({
      workoutname: 'Test Track Workout Name',
      exercises: exercisesWorkoutPlan
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})
test(`POST ${addCompletedWorkoutRoute} with missing workoutname results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(addCompletedWorkoutRoute)
    .set({ authorization: token })
    .send({
      userid: uuid, exercises: exercisesWorkoutPlan
    })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test(`POST ${addCompletedWorkoutRoute} with missing exercises results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(addCompletedWorkoutRoute)
    .set({ authorization: token })
    .send({
      userid: uuid,
      workoutname: 'Test Track Workout Name'
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test(`POST ${addCompletedWorkoutRoute} with bad timestamp format results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(addCompletedWorkoutRoute)
    .set({ authorization: token })
    .send({
      userid: uuid,
      workoutname: 'Test Track Workout Name',
      exercises: exercisesWorkoutPlan,
      timestamp: uuid
    })

  t.true(response.status === 400)
  t.true(response.body.mssg === 'Something went wrong!')
})

test(`POST ${addCompletedWorkoutRoute} with correct inputs adds a completed workout`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(addCompletedWorkoutRoute)
    .set({
      authorization: token
    })
    .send({
      userid: uuid,
      workoutname: 'Test Track Workout Name',
      exercises: [
        {
          name: 'Machine Bicep Curl',
          sets: 3,
          distance: null,
          duration: null,
          warmUpSet: false,
          weight: [12, 12, 12],
          reps: [12, 6, 5],
          calories: 50
        },
        {
          name: 'Slow Jog',
          sets: null,
          weight: null,
          warmUpSet: false,
          reps: null,
          calories: 50,
          distance: 5000,
          duration: 23.00
        }
      ]
    })
  const { dataSelectAllCompletedWorkoutNames, errorSelectAllCompletedWorkoutNames }: any = await selectAllCompletedWorkoutNames(uuid)
  if (errorSelectAllCompletedWorkoutNames) {
    t.fail('Error selecting workouts done by user')
  }
  const { dataSelectAllTrackedWorkoutsWithExercises, errorSelectAllTrackedWorkoutsWithExercises }: any = await selectAllTrackedWorkoutsWithExercises(dataSelectAllCompletedWorkoutNames[0].completedWorkoutID)
  if (errorSelectAllTrackedWorkoutsWithExercises) {
    t.fail('Selecting Tracked Workouts with exercises went wrong!')
  }
  const { dataSelectAllActualExercises, errorSelectAllActualExercises } = await selectAllActualExercises(uuid)
  if (errorSelectAllActualExercises) {
    t.fail(JSON.stringify(errorSelectAllActualExercises))
  }
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Successfully tracked a workout!' }))
  t.true(dataSelectAllCompletedWorkoutNames.length === 1)
  t.true(dataSelectAllTrackedWorkoutsWithExercises.length === 2)
  t.true(dataSelectAllActualExercises.length === 2)
})

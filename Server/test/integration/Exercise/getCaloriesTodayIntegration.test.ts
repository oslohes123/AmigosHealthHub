import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createToken, createUserWithID, deleteUserRow } from '../../../utils/userFunctions'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
import RouteNamesClass from '../../../utils/routeNamesClass'
import test from 'ava'
import request from 'supertest'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
const routeNames = new RouteNamesClass()
const getCaloriesTodayRoute = routeNames.fullGetCaloriesToday
let randomEmail: string
let token: string
const uuid = uuidv4()
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Calories',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
  token = createToken(uuid)
})
test.after.always('guaranteed cleanup of user', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})

test.serial(`GET ${getCaloriesTodayRoute} with no userid provided should return error`, async (t: any) => {
  const response = await request(app)
    .get(getCaloriesTodayRoute)
    .set('authorization', token)

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test.serial(`GET ${getCaloriesTodayRoute} with a user who has no workouts returns 0 calories`, async (t: any) => {
  const response = await request(app)
    .get(getCaloriesTodayRoute)
    .set({ authorization: token, userid: uuid })

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'User has no workouts!', totalCaloriesBurnt: 0 }))
})

test.serial(`GET ${getCaloriesTodayRoute} with a user with a valid workoutplan returns the correct number of calories burnt`, async (t: any) => {
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }

  const response = await request(app)
    .get(getCaloriesTodayRoute)
    .set({ authorization: token, userid: uuid })

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success', totalCaloriesBurnt: 1000 }))
})

import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/User/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { setUpCompletedWorkoutForTests } from '../../../utils/Exercise/setUpCompletedWorkoutForTests'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import { deleteMultipleExercises } from '../../../utils/Exercise/insertAndDeleteMultipleExercises'
const routeNames = new RouteNamesClass()
const getAllExercisesRoute = routeNames.fullGetAllExercisesURL

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
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})
interface getAllExercisesRequest {
  userid?: string
}
const validRequest: getAllExercisesRequest = {
  userid: uuid
}
test.serial('getAllExercises route is correct', (t: ExecutionContext) => {
  t.true(getAllExercisesRoute === '/api/user/exercise/getAll')
})
test.serial(`GET ${getAllExercisesRoute} results in error when userid is missing`, async (t: ExecutionContext) => {
  const cloneValidRequest = cloneDeep(validRequest)
  delete cloneValidRequest.userid
  const response = await request(app)
    .get(getAllExercisesRoute)
    .set({ authorization: token, ...cloneValidRequest })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial(`GET ${getAllExercisesRoute} results in empty arrayOfExerciseNames when userid has no completed workouts`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getAllExercisesRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Success!', arrayOfExerciseNames: [] }))
})

test.serial(`GET ${getAllExercisesRoute} results in populated arrayOfExerciseNames when userid has completed workouts`, async (t: ExecutionContext) => {
  const nameOfWorkout = 'Test Completed Workout'
  const { errorSetUpCompletedWorkoutForTests, successSetUpCompletedWorkoutForTests } = await setUpCompletedWorkoutForTests(uuid, nameOfWorkout)
  if (errorSetUpCompletedWorkoutForTests || !successSetUpCompletedWorkoutForTests) {
    t.fail('Error setting up completed workout for tests')
  }
  const response = await request(app)
    .get(getAllExercisesRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(response.body.mssg === 'Success!')
  t.true(response.body.arrayOfExerciseNames.includes(`Test Curl ${uuid}`))
  t.true(response.body.arrayOfExerciseNames.includes(`Slow Jog ${uuid}`))
})

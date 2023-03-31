import app from '../../../index'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import { createUserWithID, createHashedPassword, createToken, deleteUserRow } from '../../../utils/User/userFunctions'
import { cloneDeep } from 'lodash'
const routeNames = new RouteNamesClass()
const getExerciseByNameRoute = routeNames.fullGetExerciseURL

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

interface getExerciseByNameRequest {
  exercisename?: string
}
const validRequest: getExerciseByNameRequest = {
  exercisename: 'bench press'
}
test('getExerciseByName route is correct', (t: ExecutionContext) => {
  t.true(getExerciseByNameRoute === '/api/user/exercise/get')
})
test(`GET ${getExerciseByNameRoute} with missing exercisename results in error`, async (t: ExecutionContext) => {
  const invalidReqWithNoExercisename = cloneDeep(validRequest)
  delete invalidReqWithNoExercisename.exercisename
  const response = await request(app)
    .get(getExerciseByNameRoute)
    .set({ authorization: token, ...invalidReqWithNoExercisename })
  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong', dev: 'JSON instance does not follow JSON schema' }))
})

test(`GET ${getExerciseByNameRoute} with correct exercisename results in success`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getExerciseByNameRoute)
    .set({ authorization: token, ...validRequest })

  t.true(response.status === 200)
  t.true(response.body.mssg === 'Exercise Matched!')
  t.true(response.body.exerciseInformation.name === 'Dumbbell Bench Press')
})

test(`GET ${getExerciseByNameRoute} with random and incorrect exercisename results in error`, async (t: ExecutionContext) => {
  const invalidRequest = cloneDeep(validRequest)
  invalidRequest.exercisename = 'asdad1d12wdasdaasdsd'
  const response = await request(app)
    .get(getExerciseByNameRoute)
    .set({ authorization: token, ...invalidRequest })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'No exercise of that name was found!' }))
})

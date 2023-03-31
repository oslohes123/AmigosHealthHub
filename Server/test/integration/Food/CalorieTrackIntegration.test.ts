import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword, createToken } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
const foodBase = routeNames.foodBaseURL
const todaysDate = new Date().toISOString().split('T')[0]

let testEmail: string
let hashedPassword: string
let token: string
let userID: string

let testCalorieId: string

test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  testEmail = `${uuid}@gmail.com`

  hashedPassword = await createHashedPassword('OriginalPassword123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'FoodSearchIntegrationTest',
    lastName: 'FoodSearchIntegrationTest',
    email: testEmail,
    password: hashedPassword,
    age: '31'
  })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'id')
  if (error) {
    t.fail('Inserting first user failed!')
  }
  token = createToken(data[0].id)
  userID = data[0].id

  // Insert a calorie to be used for testing
  const { data: insertingData, error: insertingError }: any = await supabaseQuery.insert(supabase, 'Calories', {
    UserID: userID,
    CalorieGoal: 2000,
    Date: todaysDate
  })
  if (insertingError !== undefined) {
    t.fail('Inserting first user failed!')
  }
  testCalorieId = insertingData[0].id
})

test.after.always(async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail)
})

test(`POST ${foodBase + routeNames.partialCreateCalorieLogURL} create calorie goal`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(foodBase + routeNames.partialCreateCalorieLogURL)
    .set('authorization', token)
    .send({ CalorieGoal: 999, UserID: userID, Date: '2021-01-01' })
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.is(response.body[0].UserID, userID)
  t.is(response.body[0].CalorieGoal, 999)
  t.is(response.body[0].Date, '2021-01-01')
})

test(`GET ${foodBase + routeNames.partialReadCaloriesURL} correctly`, async (t: ExecutionContext) => {
  const readURl = '/calorieTrack/General.'
  const response = await request(app)
    .get(foodBase + readURl + userID)
    .set('authorization', token)
    .send()

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

test('GET Read specific calorie goal', async (t: ExecutionContext) => {
  const readURl = '/calorieTrack/Specific.'
  const response = await request(app)
    .get(foodBase + readURl + testCalorieId)
    .set('authorization', token)
    .send()

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

test('POST update specific calorie goal', async (t: ExecutionContext) => {
  const response = await request(app)
    .post(foodBase + routeNames.partialUpdateSpecificCaloriesURL)
    .set('authorization', token)
    .send({ CalorieGoal: 999, id: testCalorieId })

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

test('DELETE delete specific calorie goal', async (t: ExecutionContext) => {
  const response = await request(app)
    .post(foodBase + routeNames.partialDeleteCalorieLogURL)
    .set('authorization', token)
    .send({ id: testCalorieId })

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

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
const AddTrackedFoodRoute = routeNames.fullAddTrackedFoodURL

let testEmail: string
let hashedPassword: string
let token: string
let userID: string

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
})

test.after.always(async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail)
})

test(`POST ${AddTrackedFoodRoute} with no fields`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(AddTrackedFoodRoute)
    .set('authorization', token)
    .send({})

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  const responseJSON = JSON.parse(response.text)
  t.true(responseJSON.mssg === 'Invalid JSON Schema')
})

test(`POST ${AddTrackedFoodRoute} correctly`, async (t: ExecutionContext) => {
  const testFood = {
    input: {
      foodIdentifier: 'food_1',
      foodData: {
        food_name: 'test food',
        calories: 100,
        protein: 10,
        sugar: 10,
        fiber: 10,
        brand_name: 'test brand',
        fat: 10,
        carbohydrates: 10,
        serving_qty: 1,
        serving_unit: 'g',
        serving_weight_grams: 100,
        alt_measures: [{ serving_weight: 100, measure: 'g', seq: 1, qty: 1 }]

      }
    },
    userID
  }

  const response = await request(app)
    .post(AddTrackedFoodRoute)
    .set('authorization', token)
    .send(testFood)

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

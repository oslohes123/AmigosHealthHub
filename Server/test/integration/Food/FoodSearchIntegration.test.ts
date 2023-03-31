import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword, createToken } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import test from 'ava'
import request from 'supertest'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()

let testEmail: string
let hashedPassword: string
let token: string

test.before(async (t: any) => {
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
})

test.after.always(async (t: any) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail)
})

test(`GET ${routeNames.foodBaseURL} correctly `, async (t: any) => {
  const response = await request(app)
    .get(routeNames.foodBaseURL + '/0.apple')
    .set('authorization', token)
    .send({})

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
})

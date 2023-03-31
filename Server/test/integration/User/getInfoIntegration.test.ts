import app from '../../../index'
import { createHashedPassword, createToken } from '../../../utils/User/userFunctions'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/General/databaseInterface'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import request from 'supertest'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
const getInfoRoute = routeNames.fullGetInfoURL

let existingEmail: string
let hashedPassword: string
let token: string
test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  existingEmail = `${uuid}@gmail.com`

  hashedPassword = await createHashedPassword('CorrectPassword123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'Already',
    lastName: 'Exists',
    email: existingEmail,
    age: 30,
    password: hashedPassword
  })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', existingEmail, 'id')

  if (error) {
    t.fail('Inserting and selecting user failed!')
  }
  token = createToken(data[0].id)

  if (error) {
    t.fail(error)
  }
})

test.after.always('guaranteed clean up', async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', existingEmail)
})

test(`GET ${getInfoRoute} with no fields`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getInfoRoute)
    .set('authorization', token)

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Email must be provided' }))
})

test(`GET ${getInfoRoute} with existing user`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(getInfoRoute)
    .set({ authorization: token, email: existingEmail })
  const expectedResponse = JSON.stringify({
    firstName: 'Already',
    lastName: 'Exists',
    email: existingEmail,
    age: 30
  })
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body.user) === expectedResponse)
})

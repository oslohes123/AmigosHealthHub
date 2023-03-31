import app from '../../../index'
import { createHashedPassword, createToken, deleteUserRow } from '../../../utils/userFunctions'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import RouteNamesClass from '../../../utils/routeNamesClass'
import request from 'supertest'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()

const checkInitialTokenRoute = routeNames.fullCheckInitialTokenURL

test(`GET ${checkInitialTokenRoute} with missing authorization`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(checkInitialTokenRoute)

  t.true(response.status === 401)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'No Authorization Header' }))
})

test(`GET ${checkInitialTokenRoute} with authorization header with no spaces results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(checkInitialTokenRoute)
    .set('authorization', 'tokenValue')

  t.true(response.status === 401)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Authorization header must have format 'bearer token'." }))
})

test(`GET ${checkInitialTokenRoute} with authorization header with no bearer substring results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(checkInitialTokenRoute)
    .set('authorization', ' tokenValue')

  t.true(response.status === 401)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Authorization header must have format 'bearer token'." }))
})

test(`GET ${checkInitialTokenRoute} with illegitimate token in authorization header results in error`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(checkInitialTokenRoute)
    .set('authorization', 'bearer tokenValue')

  t.true(response.status === 401)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Request Failed due to Authentication' }))
})

test(`GET ${checkInitialTokenRoute} with incorrect payload results in error`, async (t: ExecutionContext) => {
  const uuid = uuidv4()
  const token = createToken(uuid)

  const response = await request(app)
    .get(checkInitialTokenRoute)
    .set('authorization', `${token}`)

  t.true(response.status === 401)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Request Failed due to Authentication' }))
})

test(`GET ${checkInitialTokenRoute} with legitimate token results in success`, async (t: ExecutionContext) => {
  const uuid = uuidv4()
  const testUser = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('User1Password123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'Test',
    lastName: 'User',
    email: testUser,
    password: hashedPassword,
    age: 31
  })

  const { data }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testUser, 'id')

  const token = createToken(data[0].id)

  const response = await request(app)
    .get(checkInitialTokenRoute)
    .set('authorization', `${token}`)

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Legitimate token' }))
  await deleteUserRow(testUser)
})

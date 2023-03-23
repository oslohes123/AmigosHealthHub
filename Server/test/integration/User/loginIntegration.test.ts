import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import request from 'supertest'
import test from 'ava'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
/**
 * Refactor using objects, interfaces to prevent repeated code.
 */
const loginRoute = routeNames.fullLoginURL
let randomEmail: string

test.before(async (t: any) => {
  const uuid = uuidv4()
  randomEmail = `${uuid}@gmail.com`
  console.log('In before')

  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  const { error }: any = await supabaseQuery.insert(supabase, 'User', {
    firstName: 'firstName',
    lastName: 'lastName',
    email: randomEmail,
    password: hashedPassword
  })

  if (error) {
    t.fail()
  }
})

test.after.always('guaranteed cleanup of users', async (t: any) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail)
})

test(`POST ${loginRoute} with missing email`, async (t: any) => {
  const response = await request(app)
    .post(loginRoute)
    .send({ password: 'Password123' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${loginRoute} with missing password`, async (t: any) => {
  const response = await request(app)
    .post(loginRoute)
    .send({ email: 'testemail@gmail.com' })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${loginRoute} with missing password and email`, async (t: any) => {
  const response = await request(app)
    .post(loginRoute)
    .send({})

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${loginRoute} with non-existent email`, async (t: any) => {
  const response = await request(app)
    .post(loginRoute)
    .send({
      email: `${uuidv4()}@gmail.com`,
      password: 'CorrectPassword123!'
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Incorrect Email' }))
})

test(`POST ${loginRoute} with correct email and password`, async (t: any) => {
  const response = await request(app)
    .post(loginRoute)
    .send({
      email: randomEmail,
      password: 'CorrectPassword123!'
    })

  const expectation = {
    firstName: 'someFirstName',
    email: 'someEmail',
    token: 'someToken',
    id: 'someId',
    mssg: 'someMessage'
  }
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(Object.keys(response.body)) === JSON.stringify(Object.keys(expectation)))
  t.true(Object.keys(response.body).length === 5)
  t.true(response.body.firstName === 'firstName')
  t.true(response.body.email === randomEmail)
  t.true(response.body.mssg === 'Successful Login')
})

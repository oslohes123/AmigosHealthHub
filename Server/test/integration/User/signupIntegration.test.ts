import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
const request = require('supertest')
const test = require('ava')
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
const signupRoute = routeNames.fullSignupURL

let alreadyExistsEmail: string
let hashedPassword: string
test.before(async (t: any) => {
  const uuid = uuidv4()
  alreadyExistsEmail = `${uuid}@gmail.com`

  hashedPassword = await createHashedPassword('CorrectPassword123!')
  const { error }: any = await supabaseQuery.insert(supabase, 'User', {
    firstName: 'already',
    lastName: 'exists',
    email: alreadyExistsEmail,
    password: hashedPassword
  })

  if (error) {
    t.fail(error)
  }
})


test.after.always('guaranteed cleanup of users', async (t: any) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', alreadyExistsEmail);
});

test('POST /api/user/sign_up with no fields', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({})

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with missing email', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      password: 'CorrectPassword123!',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with missing password', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with missing last name', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      email: 'johndoe@gmail.com',
      password: 'CorrectPassword123!',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with missing first name', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      email: 'johndoe@gmail.com',
      lastName: 'Doe',
      password: 'CorrectPassword123!',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with missing age', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      password: 'CorrectPassword123!',
      email: 'johndoe@gmail.com'
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test('POST /api/user/sign_up with invalid email structure', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      password: '12345678',
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Invalid Email' }))
})

test('POST /api/user/sign_up with  first or last name containing non-letter characters', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John1',
      lastName: 'Doe2',
      email: 'john.doe@example.com',
      password: 'CorrectPassword123!',
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'First name and last name must only contains letters a-z or A-Z' }))
})

test('POST /api/user/sign_up with weak password', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'weakPassword123',
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol' }))
})

test('POST /api/user/sign_up with already existing email', async (t: any) => {
  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'Different',
      lastName: 'Name',
      password: 'CorrectPassword123!',
      email: alreadyExistsEmail,
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'User already exists!' }))
})

test('POST /api/user/sign_up with valid details', async (t: any) => {
  const uuid = uuidv4()
  const randomEmail = `${uuid}@gmail.com`

  const response = await request(app)
    .post(signupRoute)
    .send({
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'CorrectPassword123!',
      email: randomEmail,
      age: 30
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
  t.true(response.body.email === randomEmail)
  t.true(response.body.firstName === 'Jane')
  t.true(response.body.mssg === 'Successful sign up!')

  await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail)
})

import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/General/databaseInterface'
import { createHashedPassword, createToken } from '../../../utils/User/userFunctions'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
const changeStatsRoute = routeNames.fullChangeStatsURL

let firstUserEmail: string
let hashedPassword1: string
let secondUserEmail: string
let hashedPassword2: string
let token1: string
// let token2: string

const uuid = uuidv4()
const newEmail = `CHANGED${uuid}@gmail.com`

test.before(async (t: ExecutionContext) => {
  const uuid1 = uuidv4()
  firstUserEmail = `${uuid1}@gmail.com`

  hashedPassword1 = await createHashedPassword('User1Password123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'First',
    lastName: 'User',
    email: firstUserEmail,
    password: hashedPassword1,
    age: 31
  })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', firstUserEmail, 'id')

  token1 = createToken(data[0].id)
  if (error) {
    t.fail('Inserting second user failed!')
  }
})

test.before(async (t: ExecutionContext) => {
  const uuid2 = uuidv4()
  secondUserEmail = `${uuid2}@gmail.com`

  hashedPassword2 = await createHashedPassword('User2Password123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'Second',
    lastName: 'User',
    email: secondUserEmail,
    password: hashedPassword2,
    age: 30
  })

  const { error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', secondUserEmail, 'id')

  if (error) {
    t.fail('Inserting second user failed!')
  }
})

test.after.always('guaranteed cleanup of users', async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', firstUserEmail)
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', newEmail)
})

test(`POST ${changeStatsRoute} with no fields`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({})

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with missing first name`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      lastName: 'Doe',
      prevEmail: 'prevEmail@example.com',
      newEmail: 'newEmail@example.com',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with missing last name`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      prevEmail: 'prevEmail@example.com',
      newEmail: 'newEmail@example.com',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with missing prevEmail`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      newEmail: 'newEmail@example.com',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with missing newEmail`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      prevEmail: 'prevEmail@example.com',
      age: 0
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with missing age`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      prevEmail: 'prevEmail@example.com',
      newEmail: 'newEmail@example.com'
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changeStatsRoute} with bad newEmail structure`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      prevEmail: secondUserEmail,
      newEmail: 'badEmaile.com',
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Invalid New Email' }))
})

test(`POST ${changeStatsRoute} with newEmail that already exists`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'John',
      lastName: 'Doe',
      prevEmail: secondUserEmail,
      newEmail: firstUserEmail,
      age: 30
    })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Email Already Exists' }))
})

test(`POST ${changeStatsRoute} with new available email`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'Second',
      lastName: 'User',
      prevEmail: secondUserEmail,
      newEmail,
      age: 30
    })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', newEmail, '*')

  if (error) {
    t.fail('selecting a user went wrong!')
  }

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Successful New Email' }))
  t.true(data[0].email === newEmail)
})

test(`POST ${changeStatsRoute} with same email`, async (t: ExecutionContext) => {
  const response = await request(app)
    .post(changeStatsRoute)
    .set('authorization', token1)
    .send({
      firstName: 'Changedfirst',
      lastName: 'User',
      prevEmail: firstUserEmail,
      newEmail: firstUserEmail,
      age: 33
    })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', firstUserEmail, '*')

  if (error) {
    t.fail('selecting a user went wrong!')
  }

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Successful Update' }))
  t.true(data[0].firstName === 'Changedfirst')
  t.true(data[0].age === 33)
  t.true(data[0].lastName === 'User')
})

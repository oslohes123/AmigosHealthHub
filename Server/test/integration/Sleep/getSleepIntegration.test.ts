import app from '../../../index'
import test from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'

const routeNames = new RouteNamesClass()
const getSleepRoute = routeNames.fullGetSleepURL

const databaseQuery = new SupabaseQueryClass()

let randomEmail: string
const uuid = uuidv4()
const sleepID = uuidv4()

let token: string
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'addSleepIntegration',
    lastName: 'TestUser',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
  token = createToken(uuid)
})

test.after.always('guaranteed cleanup of user and delete exercises', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

test.serial.before(async (t: any) => {
  const { error }: any = await databaseQuery.insert(supabase, 'Sleep Data', {
    sleepid: sleepID,
    userID: uuid,
    hoursSlept: 7,
    timestamp: '2023-03-22',
    sleepQuality: 10
  })
  if (error) {
    // console.log(`MHtesterror:${error}`);
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test('Attempt to get sleep data without UserID', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: null,
      startDate: '2023-03-20',
      endDate: '2023-03-23'
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to get sleep data without start date', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      startDate: null,
      endDate: '2023-03-23'
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to get sleep data without end date', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      startDate: '2023-03-20',
      endDate: null
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to get sleep data with invalid dates', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      startDate: '2023-03-23',
      endDate: '2023-03-20'
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Start date cannot be after end date' }))
})

test('Attempt to get sleep data when no data in database', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      startDate: '2022-01-10',
      endDate: '2022-01-20'
    })

  t.true(response.status === 404)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Data not found!' }))
})

test('Attempt to get sleep data within valid range', async (t: any) => {
  const response = await request(app)
    .post(getSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      startDate: '2023-03-20',
      endDate: '2023-03-23'
    })

  t.true(response.status === 200)

  t.true(JSON.stringify(response.body.sleep[0]) === JSON.stringify({
    userID: uuid,
    hoursSlept: 7,
    timestamp: '2023-03-22',
    sleepid: sleepID,
    sleepQuality: 10
  }))
})

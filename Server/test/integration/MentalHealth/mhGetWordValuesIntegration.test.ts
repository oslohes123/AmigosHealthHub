import app from '../../../index'
import { createToken, createHashedPassword, getUserByEmail, deleteUserRow, createUserWithID } from '../../../utils/userFunctions'
import { getDate } from '../../../utils/convertTimeStamptz'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { createMentalHealthUser } from '../../../utils/asyncMentalHealthFunctions'

import request from 'supertest'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const routeNames = new RouteNamesClass()
// /**
//  * Refactor using objects, interfaces to prevent repeated code.
//  */
const wordCloudRoute = routeNames.fullWordCloudURL

const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
let token: string
const todayDate = getDate(moment().format())
test.serial.before(async (t: ExecutionContext) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'First',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 31
  })
  if (error) {
    t.fail(`Insering user: ${JSON.stringify(error)}`)
  }
})

test.serial.before(async (t: ExecutionContext) => {
  const { data, error }: any = await getUserByEmail(randomEmail)
  if (error) {
    t.fail('Inserting first user failed!')
  }
  token = createToken(data[0].id)
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '5',
    created_at: '2020-03-01 00:00:00+00',
    todays_word: 'Happy'
  })

  if (error) {
    t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '2',
    created_at: '2020-03-02 00:00:00+00',
    todays_word: 'Sad'
  })

  if (error) {
    t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '3',
    created_at: '2020-03-03 00:00:00+00',
    todays_word: 'Alright'
  })

  if (error) {
    t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: '2020-03-04 00:03:00+00',
    todays_word: 'Awful'
  })

  if (error) {
    t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '4',
    created_at: '2020-03-05 00:00:00+00',
    todays_word: 'Happy'
  })

  if (error) {
    t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '3',
    created_at: '2020-03-06 00:00:00+00',
    todays_word: 'Mediocre'
  })

  if (error) {
    t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '2',
    created_at: '2020-03-07 00:00:00+00',
    todays_word: 'Depressed'
  })

  if (error) {
    t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: '2020-03-08 00:00:00+00',
    todays_word: 'Awful'
  })

  if (error) {
    t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: todayDate,
    todays_word: 'Awful'
  })

  if (error) {
    t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: ExecutionContext) => {
  await deleteUserRow(randomEmail)
})

test(`GET ${wordCloudRoute} with incorrect ID`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(wordCloudRoute)
    .set({ authorization: token, userid: wrongUUID })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})
test(`GET ${wordCloudRoute} with correct ID`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(wordCloudRoute)
    .set({ authorization: token, userid: uuid })
  const expectedArgs = {
    mssg: 'MentalHealthOverview',
    words: [
      "\"Awful\"",
      "\"Depressed\"",
      "\"Mediocre\"",
      "\"Happy\"",
      "\"Alright\""
    ],
    freq: [
      '3',
      '1',
      '1',
      '1',
      '1'
    ]
  }
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs))
})

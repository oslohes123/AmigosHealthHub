import app from '../../..'
import { createToken, createHashedPassword, getUserByEmail, deleteUserRow } from '../../../utils/userFunctions'
import { getDate } from '../../../utils/convertTimeStamptz'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import RouteNamesClass from '../../../utils/routeNamesClass'
const request = require('supertest')
const test = require('ava')
const databaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
/**
 * Refactor using objects, interfaces to prevent repeated code.
 */
const wordCloudRoute = routeNames.fullWordCloudURL

const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
let token: string
const todayDate = getDate(moment().format())
test.serial.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  console.log('Inserting user')
  const { error }: any = await databaseQuery.insert(supabase, 'User', {
    id: uuid,
    firstName: 'First',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 31
  })
  if (error) {
    // console.log(`MHtesterror:${error}`);
    t.fail(`Insering user: ${JSON.stringify(error)}`)
  }
})

test.serial.before(async (t: any) => {
  const { data, error }: any = await getUserByEmail(randomEmail)
  if (error) {
    t.fail('Inserting first user failed!')
  }
  token = createToken(data[0].id)
})
test.before(async (t: any) => {
  console.log('1st executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '5', created_at: '2020-03-01 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('2nd executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '2', created_at: '2020-03-02 00:00:00+00', todays_word: 'Sad' })

  if (error) {
    t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('3rd executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '3', created_at: '2020-03-03 00:00:00+00', todays_word: 'Alright' })

  if (error) {
    t.fail(t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`))
  }
})
test.before(async (t: any) => {
  console.log('4th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '1', created_at: '2020-03-04 00:03:00+00', todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('5th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '4', created_at: '2020-03-05 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('6th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '3', created_at: '2020-03-06 00:00:00+00', todays_word: 'Mediocre' })

  if (error) {
    t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('7th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '2', created_at: '2020-03-07 00:00:00+00', todays_word: 'Depressed' })

  if (error) {
    t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('8th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '1', created_at: '2020-03-08 00:00:00+00', todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('9th executed!')
  const { error }: any = await databaseQuery.insert(supabase, 'Mental Health', { user_id: uuid, face_id: '1', created_at: todayDate, todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: any) => {
  console.log('test.after.always executed!')
  await databaseQuery.deleteFrom(supabase, 'Mental Health', 'user_id', uuid)
  await deleteUserRow(randomEmail)
})

test(`GET ${wordCloudRoute} with incorrect ID`, async (t: any) => {
  const response = await request(app)
    .get(wordCloudRoute)
    .set({ authorization: token, id: wrongUUID })
  console.log(`test1: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Failed to retrieve last 7 words' }))
})
test(`GET ${wordCloudRoute} with correct ID`, async (t: any) => {
  const response = await request(app)
    .get(wordCloudRoute)
    .set({ authorization: token, id: uuid })
  const expectedArgs = {
    mssg: 'MentalHealthOverview',
    words: [
      '\'Awful\'',
      '\'Depressed\'',
      '\'Mediocre\'',
      '\'Happy\'',
      '\'Alright\''
    ],
    freq: [
      '3',
      '1',
      '1',
      '1',
      '1'
    ]
  }
  console.log(`test2: ${JSON.stringify(response.body)}`)
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs))
})

import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createToken, createUserWithID, deleteUserRow, getUserByEmail } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { getDate } from '../../../utils/convertTimeStamptz'
import moment from 'moment'
import { createMentalHealthUser } from '../../../utils/asyncMentalHealthFunctions'

const request = require('supertest')
const test = require('ava')
const routeNames = new RouteNamesClass()
/**
 * Refactor using objects, interfaces to prevent repeated code.
 */
const faceGraphRoute = routeNames.fullFaceGraphURL
const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
let token: string
const todayDate = getDate(moment().format())
test.serial.before(async (t: any) => {
  // const uuid = uuidv4();

  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  // const {data, error}:any = await createUser({id: uuid, firstName: "First", lastName:"User",
  // email:randomEmail, password: hashedPassword, age: 31});
  console.log('Inserting user')
  const { error }: any = await createUserWithID({
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
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '5',
    created_at: '2020-03-01 00:00:00+00',
    todays_word: 'Happy'
  })

  if (error) {
    // console.log(`MHtesterror: ${(error)}`
    t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('2nd executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '2',
    created_at: '2020-03-02 00:00:00+00',
    todays_word: 'Sad'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('3rd executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '3',
    created_at: '2020-03-03 00:00:00+00',
    todays_word: 'Alright'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`))
  }
})
test.before(async (t: any) => {
  console.log('4th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: '2020-03-04 00:03:00+00',
    todays_word: 'Awful'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('5th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '4',
    created_at: '2020-03-05 00:00:00+00',
    todays_word: 'Happy'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('6th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '3',
    created_at: '2020-03-06 00:00:00+00',
    todays_word: 'Mediocre'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('7th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '2',
    created_at: '2020-03-07 00:00:00+00',
    todays_word: 'Depressed'
  })

  if (error) {
    // console.log(`MHtesterror: ${JSON.stringify(error)}`)
    t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('8th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: '2020-03-08 00:00:00+00',
    todays_word: 'Awful'
  })

  if (error) {
    // console.log()
    t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('9th executed!')
  const { error }: any = await createMentalHealthUser({
    user_id: uuid,
    face_id: '1',
    created_at: todayDate,
    todays_word: 'Awful'
  })

  if (error) {
    // console.log()
    t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: any) => {
  console.log('test.after.always executed!')
  await deleteUserRow(randomEmail)
})

test(`GET ${faceGraphRoute} with incorrect ID`, async (t: any) => {
  const response = await request(app)
    .get(faceGraphRoute)
    .set({ authorization: token, id: wrongUUID })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Failed to retrieve last 7 faces' }))
})
test(`GET ${faceGraphRoute} with correct ID`, async (t: any) => {
  const response = await request(app)
    .get(faceGraphRoute)
    .set({ authorization: token, id: uuid })

  const expectedArgs = {
    mssg: 'Retrieved faces',
    faces: [
      '1',
      '1',
      '2',
      '3',
      '4',
      '1',
      '3'
    ],
    average: 2.142857142857143,
    success: 'successful'
  }
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs))
})

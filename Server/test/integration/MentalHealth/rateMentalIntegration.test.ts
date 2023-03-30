import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createToken, createUserWithID, deleteUserRow, getUserByEmail } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'

import request from 'supertest'
import test from 'ava'
const routeNames = new RouteNamesClass()
// /**
//  * Refactor using objects, interfaces to prevent repeated code.
//  */
const rateMentalRoute = routeNames.fullRateMentalURL

const uuid = uuidv4()
const randomEmail = `${uuid}@gmail.com`
let token: string
test.serial.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  // const {data, error}:any = await createUser({id: uuid, firstName: "First", lastName:"User",
  // email:randomEmail, password: hashedPassword, age: 31});
  console.log('Inserting user')
  console.log(`Inserted user uuid: ${uuid}`) // bf955626-40fc-4141-a92b-914a7608cb86
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
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test.serial.before(async (t: any) => {
  // const { data, error }: any = await getUserByEmail(randomEmail)
  const { data, error }: any = await getUserByEmail(randomEmail)
  if (error) {
    t.fail('Inserting first user failed!')
  }
  token = createToken(data[0].id)
})

test.after.always('guaranteed cleanup', async (t: any) => {
  console.log('test.after.always executed!')
  await deleteUserRow(randomEmail)
})

test(`POST ${rateMentalRoute} has middleware execute`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 4, word: 'Happy', userid: null })
    .set('authorization', token)

  console.log(`noIDResponse: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test(`POST ${rateMentalRoute} with no word inputted`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 4, word: '', userid: uuid })
    .set('authorization', token)

  console.log(`noWordResponse ${JSON.stringify(response.body)}`) // "You must be logged in"
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Can't submit an empty word" }))
})

test(`POST ${rateMentalRoute} with face value too low`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 0, word: 'Depressed', userid: uuid })
    .set('authorization', token)
  console.log(`uuid used ln101: ${uuid}`)
  console.log(`lowFaceValueResponse: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Face value must be between 1-5' }))
})

test(`POST ${rateMentalRoute} with face value too high`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 6, word: 'Ecstatic', userid: uuid })
    .set('authorization', token)
  console.log(`uuid used ln113: ${uuid}`)
  console.log(`highFaceValueResponse: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Face value must be between 1-5' }))
})

test(`POST ${rateMentalRoute} with correct input`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 4, word: 'Happy', userid: uuid })
    .set('authorization', token)
  console.log(`uuid used ln132: ${uuid}`) // 8d17ab59-70ed-409b-9d8f-e54728b32906
  const { data }: any = await getUserByEmail(randomEmail)
  console.log(`data selecting: ${JSON.stringify(data)}`) // data selecting: []
  console.log(`response: ${JSON.stringify(response)}`)
  console.log(`correctInput: ${JSON.stringify(response.body)}`)

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Successful Submission' }))
})

// test('passing test ', (t: any) => {
//   t.pass()
// })}

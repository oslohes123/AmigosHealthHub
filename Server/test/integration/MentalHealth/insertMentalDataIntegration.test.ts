import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createToken, createUserWithID, deleteUserRow, getUserByEmail } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'

const request = require('supertest')
const test = require('ava')
const routeNames = new RouteNamesClass()
/**
 * Refactor using objects, interfaces to prevent repeated code.
 */
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

// test(`POST ${rateMentalRoute} with incorrect ID`, async (t: any) => {
//     const response = await request(app)
//    .get(rateMentalRoute)
//    .set({"authorization":token, "id": wrong_uuid})
//    //add body as well

//    t.true(response.status === 400)
//    t.true(response.headers['content-type'] === "application/json; charset=utf-8")
//    t.true(JSON.stringify(response.body) === JSON.stringify({mssg : "Failed to retrieve last 7 faces"}));
//  })
test(`POST ${rateMentalRoute} has middleware execute`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 4, word: 'Happy', id: uuid })
    .set('authorization', token)
    // ARE YOU HERE? 2. LOOK AT ONLY UR FILES, CONTROLLERS. CTRL  + SHIT+P ESLINT RESTART SERVER// tel when ure done
    // by restarting u mean cdn o ..no no ctrl shit p then command pallete search bar should open up top. Then enter ESLINT: RESTART ESLINT SERVER
    // NOTHING COMING UP did you install ESLINT in vscode extensions, if not do that ESLint by Microsfoft 25M downloads
  // THERE//DO IT NOW SO I CAN SEE RIGHT CLICK AND PRESS QUICK FIX
  console.log(`noIDResponse: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'You must be logged in to submit data' }))
})

test(`POST ${rateMentalRoute} with no word inputted`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 4, word: '', id: uuid })
    .set('authorization', token)

  console.log(`noWordResponse ${JSON.stringify(response.body)}`) // "You must be logged in"
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Can't submit an empty word" }))
})

test(`POST ${rateMentalRoute} with face value too low`, async (t: any) => {
  const response = await request(app)
    .post(rateMentalRoute)
    .send({ face: 0, word: 'Depressed', id: uuid })
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
    .send({ face: 6, word: 'Ecstatic', id: uuid })
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
    .send({ face: 4, word: 'Happy', id: uuid })
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

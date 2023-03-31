import app from '../../../index'
import test from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword, createToken } from '../../../utils/User/userFunctions'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
const routeNames = new RouteNamesClass()

const addSleepRoute = routeNames.fullAddSleepURL
let randomEmail: string
const uuid = uuidv4()
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

test('Attempt to insert data without UserID', async (t: any) => {
  const response = await request(app)
    .post(addSleepRoute)
    .set({ authorization: token })
    .send({
      userID: null,
      timestamp: '20-03-2023',
      hoursSlept: 7,
      sleepQuality: 7
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'addSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to insert data without timestamp', async (t: any) => {
  const response = await request(app)
    .post(addSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      timestamp: null,
      hoursSlept: 7,
      sleepQuality: 7
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'addSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to insert data without hoursSlept', async (t: any) => {
  const response = await request(app)
    .post(addSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      timestamp: '20-03-2023',
      hoursSlept: null,
      sleepQuality: 7
    })

  t.true(response.status === 400)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'addSleep req.body does not match the JSON Schema!' }))
})

test('Successful insertion of sleep data', async (t: any) => {
  const response = await request(app)
    .post(addSleepRoute)
    .set({ authorization: token })
    .send({
      userID: uuid,
      sleepQuality: 3,
      timestamp: '2023-03-22',
      hoursSlept: 6
    })

  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({
    sleep: 'Sleep data added.'
  }))
})

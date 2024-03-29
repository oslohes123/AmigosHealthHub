import app from '../../../index'
import { createToken, createHashedPassword, getUserByEmail, deleteUserRow, createUserWithID } from '../../../utils/User/userFunctions'
import { getDate } from '../../../utils/General/convertTimeStamptz'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import RouteNamesClass from '../../../utils/General/routeNamesClass'
import { createMentalHealthUser } from '../../../utils/MentalHealth/asyncMentalHealthFunctions'

import test from 'ava'
import { type ExecutionContext } from 'ava'
import request from 'supertest'
const routeNames = new RouteNamesClass()

// /**
//  * Refactor using objects, interfaces to prevent repeated code.
//  */
const todaysWordRoute = routeNames.fullTodaysWordURL
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
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
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

test(`GET ${todaysWordRoute} with incorrect ID`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(todaysWordRoute)
    .set({ authorization: token, userid: wrongUUID })

  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})
//  })
test(`GET ${todaysWordRoute} with correct ID`, async (t: ExecutionContext) => {
  const response = await request(app)
    .get(todaysWordRoute)
    .set({ authorization: token, userid: uuid })
  const expectedArgs = {
    mssg: 'success',
    word: 'Awful'
  }
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs))
})

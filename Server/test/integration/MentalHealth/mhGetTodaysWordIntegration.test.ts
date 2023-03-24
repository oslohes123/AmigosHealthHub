import app from '../../..'
import { createToken, createHashedPassword, getUserByEmail, deleteUserRow, createUserWithID } from '../../../utils/userFunctions'
import { getDate } from '../../../utils/convertTimeStamptz'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { createMentalHealthUser } from '../../../utils/asyncMentalHealthFunctions'

import test from 'ava'
import request from 'supertest'
const routeNames = new RouteNamesClass()

/**
 * Refactor using objects, interfaces to prevent repeated code.
 */
const todaysWordRoute = routeNames.fullTodaysWordURL
const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
let token: string
const todayDate = getDate(moment().format())
test.serial.before(async (t: any) => {
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
    // console.log(`MHtesterror:${error}`);
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
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
  console.log('9th executed!')
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

test.after.always('guaranteed cleanup', async (t: any) => {
  console.log('test.after.always executed!')
  await deleteUserRow(randomEmail)
})

test(`GET ${todaysWordRoute} with incorrect ID`, async (t: any) => {
  const response = await request(app)
    .get(todaysWordRoute)
    .set({ authorization: token, id: wrongUUID })

  console.log(`incorrectIDError: ${JSON.stringify(response.body)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'Something went wrong!' }))
})
//  })
test(`GET ${todaysWordRoute} with correct ID`, async (t: any) => {
  const response = await request(app)
    .get(todaysWordRoute)
    .set({ authorization: token, id: uuid })
  const expectedArgs = {
    mssg: "Here is today's word!",
    word: [
      { todays_word: 'Awful' }
    ]
  }
  console.log(`correcttodaysword ${JSON.stringify(response.body)}`)
  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs))
})

// test('passing test ', (t: any) => {
//     t.pass()
//   })
  

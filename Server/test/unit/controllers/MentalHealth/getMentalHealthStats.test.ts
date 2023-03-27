import { dateValues, faceValues, todaysValue, wordValues } from '../../../../routes/MentalHealth/getMentalHealthStats.controller'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getDate } from '../../../../utils/convertTimeStamptz'
import moment from 'moment'
import type { Request, Response } from 'express'
import { createMentalHealthUser } from '../../../../utils/asyncMentalHealthFunctions'

import test from 'ava'
const sinon = require('sinon')
const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
const todayDate = getDate(moment().format())

test.serial.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
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
    t.fail(`Insering user: ${JSON.stringify(error)}`)
  }
})

test.before(async (t: any) => {
  console.log('1st executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '5', created_at: '2020-03-01 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('2nd executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '2', created_at: '2020-03-02 00:00:00+00', todays_word: 'Sad' })

  if (error) {
    t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('3rd executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '3', created_at: '2020-03-03 00:00:00+00', todays_word: 'Alright' })

  if (error) {
    t.fail(t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`))
  }
})
test.before(async (t: any) => {
  console.log('4th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: '2020-03-04 00:03:00+00', todays_word: 'Awful' })
  if (error) {
    t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('5th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '4', created_at: '2020-03-05 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('6th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '3', created_at: '2020-03-06 00:00:00+00', todays_word: 'Mediocre' })

  if (error) {
    t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('7th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '2', created_at: '2020-03-07 00:00:00+00', todays_word: 'Depressed' })

  if (error) {
    t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('8th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: '2020-03-08 00:00:00+00', todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: any) => {
  console.log('9th executed!')
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: todayDate, todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: any) => {
  console.log('test.after.always executed!')
  await deleteUserRow(randomEmail)
})

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockRequest = (sessionData: any) => {
  return {
    headers: sessionData
  }
}
test('Return last 7 words and their frequencies with incorrect ID', async (t: any) => {
  console.log('In returning last 7 words and their frequencies')
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await wordValues(req as Request, res as Response)

  const argsPassed = res.json.getCall(0).args[0]
  console.log(`argspassed incorrectID: ${JSON.stringify(argsPassed)}`)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test('Return last 7 words and their frequencies', async (t: any) => {
  console.log('In returning last 7 words and their frequencies with new ID')
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await wordValues(req as Request, res as Response)
  const argsPassedFull = res.json.getCall(0)
  console.log(`lastsevenFull: ${JSON.stringify(argsPassedFull)}`)
  const argsPassed = res.json.getCall(0).args[0]
  console.log(`lastseven: ${JSON.stringify(argsPassed)}`)

  const expectedArgs = {
    mssg: 'MentalHealthOverview',
    // [
    //     "\"Planned\"",
    //     "\"Painful\"",
    //     "\"Rough\"",
    //     "\"Mediocre\"",
    // "\"meh\"",
    //     "\"Perfect\"",
    //     "\"''\""
    // ],
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
  const stringifiedExpectedArgs = JSON.stringify(expectedArgs)

  t.true(res.status.calledWith(200))
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})
test('Getting last 7 faces and their average with an incorrect ID should result in an error', async (t: any) => {
  console.log('In returning last 7 faces and their average')
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await faceValues(req as Request, res as Response)

  const argsPassed = res.json.getCall(0).args[0]
  console.log(`argspassed incorrectID: ${JSON.stringify(argsPassed)}`)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})
test('Return last 7 faces and their average with new ID', async (t: any) => {
  console.log('In returning last 7 faces and their average with new ID')
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await faceValues(req as Request, res as Response)
  // console.log(`argsPassedFull: ${JSON.stringify(argsPassedFull)}`)
  const argsPassed = res.json.getCall(0).args[0]
  // console.log(`argspassed: ${JSON.stringify(argsPassed)}`)

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
  const stringifiedExpectedArgs = JSON.stringify(expectedArgs)
  console.log(`argsPassed ln 233:${JSON.stringify(argsPassed)}`)
  console.log(`stringifiedExpectedArgs ln 233:${stringifiedExpectedArgs}`)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

test("Return today's word", async (t: any) => {
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await todaysValue(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]

  const expectedArgs = {
    mssg: 'success',
    word: 'Awful'
  }
  const stringifiedExpectedArgs = JSON.stringify(expectedArgs)
  console.log(`argsPassed wheretodays_word:${JSON.stringify(argsPassed)}`)
  console.log(`stringifiedExpectedArgs wheretodays_word:${stringifiedExpectedArgs}`)
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

test('Getting last 7 dates with an incorrect ID should result in an error', async (t: any) => {
  console.log('In returning last 7 dates')
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await dateValues(req as Request, res as Response)

  const argsPassed = res.json.getCall(0).args[0]
  console.log(`argspasseddatesincorrectID: ${JSON.stringify(argsPassed)}`)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test('Return last 7 dates', async (t: any) => {
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await dateValues(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  const todaysDate = todayDate.substring(8, 10) + '/' + todayDate.substring(5, 7)

  const expectedArgs = {
    mssg: 'Retrieved dates',
    dates: [
      todaysDate,
      '08/03',
      '07/03',
      '06/03',
      '05/03',
      '04/03',
      '03/03'
    ],
    success: 'successful'
  }
  const stringifiedExpectedArgs = JSON.stringify(expectedArgs)
  console.log(`last7dates: ${JSON.stringify(argsPassed)}`)
  console.log(`stringifiedExpectedArgs last7dates: ${stringifiedExpectedArgs}`)
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

// // test('passing test ', (t: any) => {
//   t.pass()
// })

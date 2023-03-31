import { dateValues, faceValues, todaysValue, wordValues } from '../../../../routes/MentalHealth/getMentalHealthStats.controller'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getDate } from '../../../../utils/convertTimeStamptz'
import moment from 'moment'
import type { Request, Response } from 'express'
import { createMentalHealthUser } from '../../../../utils/asyncMentalHealthFunctions'

import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')
const uuid = uuidv4()
const wrongUUID = '1a-2345-6b7c-890d-e01f2ghij34k'
const randomEmail = `${uuid}@gmail.com`
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

test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '5', created_at: '2020-03-01 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '2', created_at: '2020-03-02 00:00:00+00', todays_word: 'Sad' })

  if (error) {
    t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '3', created_at: '2020-03-03 00:00:00+00', todays_word: 'Alright' })

  if (error) {
    t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: '2020-03-04 00:03:00+00', todays_word: 'Awful' })
  if (error) {
    t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '4', created_at: '2020-03-05 00:00:00+00', todays_word: 'Happy' })

  if (error) {
    t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '3', created_at: '2020-03-06 00:00:00+00', todays_word: 'Mediocre' })

  if (error) {
    t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '2', created_at: '2020-03-07 00:00:00+00', todays_word: 'Depressed' })

  if (error) {
    t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: '2020-03-08 00:00:00+00', todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
  }
})
test.before(async (t: ExecutionContext) => {
  const { error }: any = await createMentalHealthUser({ user_id: uuid, face_id: '1', created_at: todayDate, todays_word: 'Awful' })

  if (error) {
    t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: ExecutionContext) => {
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
test('Return last 7 words and their frequencies with incorrect ID', async (t: ExecutionContext) => {
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await wordValues(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test('Return last 7 words and their frequencies', async (t: ExecutionContext) => {
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await wordValues(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
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
test('Getting last 7 faces and their average with an incorrect ID should result in an error', async (t: ExecutionContext) => {
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await faceValues(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})
test('Return last 7 faces and their average with new ID', async (t: ExecutionContext) => {
  const req = mockRequest({
    userid: uuid
  })
  const res = mockResponse()
  await faceValues(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
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
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

test("Return today's word", async (t: ExecutionContext) => {
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
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

test('Getting last 7 dates with an incorrect ID should result in an error', async (t: ExecutionContext) => {
  const req = mockRequest({
    userid: wrongUUID
  })
  const res = mockResponse()
  await dateValues(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test('Return last 7 dates', async (t: ExecutionContext) => {
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
  t.true(res.json.calledOnceWith(argsPassed))
  t.true(JSON.stringify(argsPassed) === stringifiedExpectedArgs)
})

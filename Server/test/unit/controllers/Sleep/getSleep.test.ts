import { getSleep } from '../../../../routes/Sleep/sleep.controller'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import supabase from '../../../../utils/supabaseSetUp'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword } from '../../../../utils/userFunctions'
import type { Request, Response } from 'express'
import test from 'ava'
const sinon = require('sinon')

const databaseQuery = new SupabaseQueryClass()

const uuid = uuidv4()
const sleepID = uuidv4()
const randomEmail = `${uuid}@gmail.com`

test.serial.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  // console.log('Inserting user')
  const { error }: any = await databaseQuery.insert(supabase, 'User', {
    id: uuid,
    firstName: 'addSleep',
    lastName: 'TestUser',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })
  if (error) {
    // console.log(`MHtesterror:${error}`);
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test.serial.before(async (t: any) => {
  // console.log('Inserting user')
  const { error }: any = await databaseQuery.insert(supabase, 'Sleep Data', {
    sleepid: sleepID,
    userID: uuid,
    hoursSlept: 7,
    timestamp: '2023-03-22',
    sleepQuality: 10
  })
  if (error) {
    // console.log(`MHtesterror:${error}`);
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: any) => {
  await databaseQuery.deleteFrom(supabase, 'User', 'id', uuid)
})

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockRequest = (sessionData: any) => {
  return {
    body: sessionData
  }
}

test('Attempt to get sleep data without UserID', async (t: any) => {
  const req = mockRequest({
    userID: null,
    startDate: '2023-03-20',
    endDate: '2023-03-23'
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' }))
})

test('Attempt to get sleep data without start date', async (t: any) => {
  const req = mockRequest({
    userID: uuid,
    startDate: null,
    endDate: '2023-03-23'
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(
    res.json.calledWith({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' })
  )
})

test('Attempt to get sleep data without end date', async (t: any) => {
  const req = mockRequest({
    userID: uuid,
    startDate: '2023-03-20',
    endDate: null
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(
    res.json.calledWith({ mssg: 'Something went wrong!', dev: 'getSleep req.body does not match the JSON Schema!' })
  )
})

test('Attempt to get sleep data with invalid dates', async (t: any) => {
  const req = mockRequest({
    userID: uuid,
    startDate: '2023-03-23',
    endDate: '2023-03-20'
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(
    res.json.calledWith({ mssg: 'Start date cannot be after end date' })
  )
})

test('Attempt to get sleep data when no data in database', async (t: any) => {
  const req = mockRequest({
    userID: uuid,
    startDate: '2022-01-10',
    endDate: '2022-01-20'
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(404))
  t.true(res.json.calledWith({ mssg: 'Data not found!' }))
})

test('Attempt to get sleep data within valid range', async (t: any) => {
  const req = mockRequest({
    userID: uuid,
    startDate: '2023-03-20',
    endDate: '2023-03-23'
  })
  const res = mockResponse()
  await getSleep(req as Request, res as Response)

  t.true(res.status.calledWith(200))
  t.deepEqual(res.json.lastCall.args[0].sleep, [
    {
      sleepid: sleepID,
      userID: uuid,
      hoursSlept: 7,
      timestamp: '2023-03-22',
      sleepQuality: 10
    }
  ])
})

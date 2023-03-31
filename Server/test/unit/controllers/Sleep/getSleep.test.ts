import { getSleep } from '../../../../routes/Sleep/sleep.controller'
import { SupabaseQueryClass } from '../../../../utils/General/databaseInterface'
import supabase from '../../../../utils/General/supabaseSetUp'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword } from '../../../../utils/User/userFunctions'
import type { Request, Response } from 'express'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')

const databaseQuery = new SupabaseQueryClass()

const uuid = uuidv4()
const sleepID = uuidv4()
const randomEmail = `${uuid}@gmail.com`

test.serial.before(async (t: ExecutionContext) => {
  const hashedPassword = await createHashedPassword('CorrectPassword123!')
  const { error }: any = await databaseQuery.insert(supabase, 'User', {
    id: uuid,
    firstName: 'addSleep',
    lastName: 'TestUser',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })
  if (error) {
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test.serial.before(async (t: ExecutionContext) => {
  const { error }: any = await databaseQuery.insert(supabase, 'Sleep Data', {
    sleepid: sleepID,
    userID: uuid,
    hoursSlept: 7,
    timestamp: '2023-03-22',
    sleepQuality: 10
  })
  if (error) {
    t.fail(`Inserting user: ${JSON.stringify(error)}`)
  }
})

test.after.always('guaranteed cleanup', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data without UserID', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data without start date', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data without end date', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data with invalid dates', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data when no data in database', async (t: ExecutionContext) => {
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

test('Attempt to get sleep data within valid range', async (t: ExecutionContext) => {
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

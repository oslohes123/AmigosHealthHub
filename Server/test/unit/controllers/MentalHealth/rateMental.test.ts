import { insertMentalData } from '../../../../routes/MentalHealth/rateMental.controller'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/User/userFunctions'
import type { Request, Response } from 'express'

import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')

const uuid = uuidv4()
const randomEmail = `${uuid}@gmail.com`

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
    body: sessionData
  }
}
test('Attempt to insert data without logging in', async (t: ExecutionContext) => {
  const req = mockRequest({
    face: 4,
    word: 'Happy',
    userid: null
  })
  const res = mockResponse()
  await insertMentalData(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test('Attempt to insert data with an empty word', async (t: ExecutionContext) => {
  const req = mockRequest({
    face: 2,
    word: '',
    userid: uuid
  })
  const res = mockResponse()
  await insertMentalData(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledOnceWith({ mssg: 'Can\'t submit an empty word' }))
})

test('Attempt to insert data with a face value too high', async (t: ExecutionContext) => {
  const req = mockRequest({
    face: 6,
    word: 'Ecstatic',
    userid: uuid
  })
  const res = mockResponse()
  await insertMentalData(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledOnceWith({ mssg: 'Face value must be between 1-5' }))
})

test('Attempt to insert data with a face value too low', async (t: ExecutionContext) => {
  const req = mockRequest({
    face: 0,
    word: 'awful',
    userid: uuid
  })
  const res = mockResponse()
  await insertMentalData(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledOnceWith({ mssg: 'Face value must be between 1-5' }))
})

test('Insert correct data into database', async (t: ExecutionContext) => {
  const req = mockRequest({
    face: 1,
    word: 'Awful',
    userid: uuid
  })
  const res = mockResponse()
  await insertMentalData(req as Request, res as Response)

  t.true(res.status.calledWith(200))
  t.true(res.json.calledOnceWith({ mssg: 'Successful Submission' }))
})

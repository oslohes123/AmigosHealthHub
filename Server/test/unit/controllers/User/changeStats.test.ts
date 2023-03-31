import { type Request, type Response } from 'express'
import { changeStats } from '../../../../routes/User/changeProfileDetails.controller'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')
const supabaseQuery = new SupabaseQueryClass()

// SetUp
let firstUserEmail: string
let hashedPassword1: string
let secondUserEmail: string
let hashedPassword2: string

const uuid = uuidv4()
const newEmail = `CHANGED${uuid}@gmail.com`

test.before(async (t: ExecutionContext) => {
  const uuid1 = uuidv4()
  firstUserEmail = `${uuid1}@gmail.com`

  hashedPassword1 = await createHashedPassword('User1Password123!')

  const { error }: any = await createUser({
    firstName: 'First',
    lastName: 'User',
    email: firstUserEmail,
    password: hashedPassword1,
    age: 31
  })

  if (error) {
    t.fail('Inserting second user failed!')
  }
})

test.before(async (t: ExecutionContext) => {
  const uuid2 = uuidv4()
  secondUserEmail = `${uuid2}@gmail.com`

  hashedPassword2 = await createHashedPassword('User2Password123!')
  const { error }: any = await supabaseQuery.insert(supabase, 'User', {
    firstName: 'Second',
    lastName: 'User',
    email: secondUserEmail,
    password: hashedPassword2,
    age: 30
  })
  if (error) {
    t.fail('Inserting second user failed!')
  }
})

test.after.always('guaranteed cleanup of user', async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', firstUserEmail)
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', newEmail)
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

/**
   * Test changeStats with any missing fields
   */

test('changeStats with no fields should return error', async (t: ExecutionContext) => {
  const req = mockRequest({})
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test('changeStats with missing first name should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    lastName: 'Doe',
    prevEmail: 'prevEmail@example.com',
    newEmail: 'newEmail@example.com',
    age: 0
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test('changeStats with missing last name should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    prevEmail: 'prevEmail@example.com',
    newEmail: 'newEmail@example.com',
    age: 0
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test('changeStats with missing prevEmail should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    lastName: 'Doe',
    newEmail: 'newEmail@example.com',
    age: 0
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})
test('changeStats with missing newEmail should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    lastName: 'Doe',
    prevEmail: 'prevEmail@example.com',
    age: 0
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test('changeStats with missing age should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    lastName: 'Doe',
    prevEmail: 'prevEmail@example.com',
    newEmail: 'newEmail@example.com'
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

/**
   * Bad inputs for changeStats
   */

test('changeStats with bad new email structure', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    lastName: 'Doe',
    prevEmail: secondUserEmail,
    newEmail: 'badEmaile.com',
    age: 30
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Invalid New Email' }))
})

test('changeStats with new email that already exists results in error', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'John',
    lastName: 'Doe',
    prevEmail: secondUserEmail,
    newEmail: firstUserEmail,
    age: 30
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Email Already Exists' }))
})

test('changeStats with new available email results in success', async (t: ExecutionContext) => {
  const req = mockRequest({
    firstName: 'Second',
    lastName: 'User',
    prevEmail: secondUserEmail,
    newEmail,
    age: 30
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', newEmail, '*')
  if (error) {
    t.fail(`Selecting ${newEmail} failed!`)
  }
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Successful New Email' }))
  t.true(data[0].email === newEmail)
})

test('changeStats with same email results in success', async (t: ExecutionContext) => {
  // change age 31 -> 33
  // change firstName "First" -> "Changedfirst"
  const req = mockRequest({
    firstName: 'Changedfirst',
    lastName: 'User',
    prevEmail: firstUserEmail,
    newEmail: firstUserEmail,
    age: 33
  })
  const res = mockResponse()
  await changeStats(req as Request, res as Response)
  // await signupUser(req, res);

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', firstUserEmail, '*')
  if (error) {
    t.fail(`Selecting ${firstUserEmail} failed!`)
  }
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Successful Update' }))
  t.true(data[0].firstName === 'Changedfirst')
  t.true(data[0].age === 33)
  t.true(data[0].lastName === 'User')
})

export {}

import { type Request, type Response } from 'express'
import { changePassword } from '../../../../routes/User/changeProfileDetails.controller'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/General/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/User/userFunctions'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')
const bcrypt = require('bcrypt')
const supabaseQuery = new SupabaseQueryClass()

let testEmail: string
let hashedPassword: string

test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  testEmail = `${uuid}@gmail.com`

  hashedPassword = await createHashedPassword('OriginalPassword123!')

  const { error }: any = await createUser({
    firstName: 'First',
    lastName: 'User',
    email: testEmail,
    password: hashedPassword,
    age: 31
  })

  if (error) {
    t.fail('Inserting second user failed!')
  }
})

test.after.always(async (t: ExecutionContext) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail)
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

test.serial('changePassword with no fields should return error', async (t: ExecutionContext) => {
  const req = mockRequest({})
  const res = mockResponse()
  await changePassword(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test.serial('changePassword with no email should return error', async (t: ExecutionContext) => {
  const req = mockRequest({
    oldPassword: 'OriginalPassword123!',
    newPassword: 'NewPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test.serial('changePassword with no oldPassword should returns error', async (t: ExecutionContext) => {
  const req = mockRequest({
    email: testEmail,
    newPassword: 'NewPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test.serial('changePassword with no newPassword should returns error', async (t: ExecutionContext) => {
  const req = mockRequest({
    email: testEmail,
    oldPassword: 'OriginalPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'All Fields Must Be Filled' }))
})

test.serial('changePassword with non-existent user email returns error', async (t: ExecutionContext) => {
  const uuid = uuidv4()
  const randomEmail: string = `${uuid}@gmail.com`

  const req = mockRequest({
    email: randomEmail,
    oldPassword: 'OriginalPassword123!',
    newPassword: 'NewPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)
  // await signupUser(req, res);
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: "Email doesn't exist in our database" }))
})

test.serial('changePassword with incorrect original password results in error', async (t: ExecutionContext) => {
  const req = mockRequest({
    email: testEmail,
    oldPassword: 'IncorrectPassword123!',
    newPassword: 'NewPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'password')

  if (error) {
    t.fail(`Selecting user with ${testEmail} failed!`)
  }
  // check password hasn't changed
  const match = await bcrypt.compare('OriginalPassword123!', data[0].password)
  t.true(match)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: "Old password doesn't match!" }))
})

test.serial('changePassword with correct original password results in success', async (t: ExecutionContext) => {
  const req = mockRequest({
    email: testEmail,
    oldPassword: 'OriginalPassword123!',
    newPassword: 'NewPassword123!'
  })
  const res = mockResponse()
  await changePassword(req as Request, res as Response)

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'password')
  if (error) {
    t.fail(`Selecting user with ${testEmail} failed!`)
  }
  // check password has changed
  const match = await bcrypt.compare('NewPassword123!', data[0].password)
  t.truthy(match)

  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'New Password Set!' }))
})

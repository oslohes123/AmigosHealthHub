import { type Request, type Response, type NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { checkTokenHelper } from '../../../utils/checkTokenHelpers'
import supabase from '../../../utils/supabaseSetUp'
import { SupbaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword, createToken, deleteUserRow } from '../../../utils/userFunctions'
const test = require('ava')
const sinon = require('sinon')
const supabaseQuery = new SupbaseQueryClass()

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

test('checkTokenHelper with missing authorization header results in error', async (t: any) => {
  const req = mockRequest({})
  const res = mockResponse()
  // const next = mockNext();
  const next = sinon.fake()
  await checkTokenHelper(req as Request, res as Response, next as NextFunction)
  // await signupUser(req, res);
  t.true(next.callCount === 0)
  t.true(res.status.calledWith(401))
  t.true(res.json.calledWith({ mssg: 'No Authorization Header' }))
})

// Not in format 'bearer token'
test('checkToken with authorization header with 0 spaces results in error', async (t: any) => {
  const req = mockRequest({
    authorization: 'tokenvalue'
  })
  const res = mockResponse()
  // const next = mockNext();
  const next = sinon.fake()
  await checkTokenHelper(req as Request, res as Response, next as NextFunction)
  // await signupUser(req, res);
  t.true(next.callCount === 0)
  t.true(res.status.calledWith(401))
  t.true(res.json.calledWith({ mssg: "Authorization header must have format 'bearer token'." }))
})

test('checkToken with no bearer substring in authorization header results in error', async (t: any) => {
  const req = mockRequest({
    authorization: ' tokenvalue'
  })
  const res = mockResponse()
  // const next = mockNext();
  const next = sinon.fake()
  await checkTokenHelper(req as Request, res as Response, next as NextFunction)
  // await signupUser(req, res);
  t.true(next.callCount === 0)
  t.true(res.status.calledWith(401))
  t.true(res.json.calledWith({ mssg: "Authorization header must have format 'bearer token'." }))
})

test('checkToken with illegitimate token in authorization header results in error', async (t: any) => {
  const req = mockRequest({
    authorization: 'bearer tokenvalue'
  })
  const res = mockResponse()
  // const next = mockNext();
  const next = sinon.fake()
  await checkTokenHelper(req as Request, res as Response, next as NextFunction)
  // await signupUser(req, res);
  t.true(next.callCount === 0)
  t.true(res.status.calledWith(401))
  t.true(res.json.calledWith({ mssg: 'Request Failed due to Authentication' }))
})

test('checkToken with jwttoken with incorrect payload results in error', async (t: any) => {
  // create token with this random uuid, token payload
  // id doesn't exist in database
  const uuid = uuidv4()
  const token = createToken(uuid)

  const req = mockRequest({
    authorization: token
  })
  const res = mockResponse()
  const next = sinon.fake()

  await checkTokenHelper(req as Request, res as Response, next as NextFunction)

  t.true(next.callCount === 0)
  t.true(res.status.calledWith(401))
  t.true(res.json.calledWith({ mssg: 'Request Failed due to Authentication' }))
})

test('checkToken with legitimate token results in next() if next exists', async (t: any) => {
  const uuid = uuidv4()
  const testUser = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('User1Password123!')
  await supabaseQuery.insert(supabase, 'User', {
    firstName: 'Test',
    lastName: 'User',
    email: testUser,
    password: hashedPassword,
    age: 31
  })

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testUser, 'id')

  if (error) {
    t.fail('Inserting and selecting user failed!')
  }
  const token = createToken(data[0].id)
  const req = mockRequest({
    authorization: token
  })
  const res = mockResponse()
  const next = sinon.fake()
  await checkTokenHelper(req as Request, res as Response, next as NextFunction)
  // await signupUser(req, res);
  t.true(next.callCount === 1)

  await checkTokenHelper(req as Request, res as Response, null)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'Legitimate token' }))

  await deleteUserRow(testUser)
})

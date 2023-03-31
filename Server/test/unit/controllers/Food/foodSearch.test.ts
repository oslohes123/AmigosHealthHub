import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
import { clientSearchMethods } from '../../../../constants'
import { generalSearch } from './../../../../routes/Food/foodSearch.controller'
import test from 'ava'
import { type ExecutionContext } from 'ava'
const sinon = require('sinon')
const supabaseQuery = new SupabaseQueryClass()

let randomEmail: string

test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUser({
    firstName: 'FoodSearchTest',
    lastName: 'FoodSearchTest',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
})

test.after.always(async () => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail)
})

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}

const mockRequest = (sessionParams: object, sessionData: object) => {
  return {
    params: sessionParams,
    body: sessionData
  }
}

test('testing InstantSearch', async (t: ExecutionContext) => {
  const req = mockRequest({
    value: 'apple',
    code: (clientSearchMethods.genericSearch).toString()
  }, {})
  const res = mockResponse()
  await generalSearch(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

// This test fails as 99 is not a valid code
test('testing wrong Search code', async (t: ExecutionContext) => {
  const req = mockRequest({
    value: 'apple',
    code: '99'
  }, {})
  const res = mockResponse()
  await generalSearch(req as Request, res as Response)
  t.true(res.status.calledWith(400))
})

test('Testing specific search', async (t: ExecutionContext) => {
  const req = mockRequest({
    value: 'apple',
    code: (clientSearchMethods.specificSearch).toString()
  }, {})
  const res = mockResponse()
  await generalSearch(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

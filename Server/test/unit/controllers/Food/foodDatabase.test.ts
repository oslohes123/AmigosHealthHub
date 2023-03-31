import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/General/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/User/userFunctions'
import { type ExecutionContext } from 'ava'
import test from 'ava'
import sinon from 'sinon'
import type FoodInput from './../../../../interfaces/Food/foodInterfaces'
import { addTrackedFood, deleteTrackedFood, getFood, getMultipleFood, getSpecificTrackedFood, getTrackedFood, updateTrackedFood } from './../../../../routes/Food/foodDatabase.controller'
const supabaseQuery = new SupabaseQueryClass()

let randomEmail: string
let usersID: string = ''
let testFood: FoodInput
let LogID: string
let FoodID: string

const todaysDate = new Date().toISOString().split('T')[0]
test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { data, error }: any = await createUser({
    firstName: 'CalorieTrackTest',
    lastName: 'CalorieTrackTest',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  } else {
    usersID = data[0].id

    testFood = {
      input: {
        foodIdentifier: 'food_1',
        foodData: {
          food_name: 'test food',
          calories: 100,
          protein: 10,
          sugar: 10,
          fiber: 10,
          brand_name: 'test brand',
          fat: 10,
          carbohydrates: 10,
          serving_qty: 1,
          serving_unit: 'g',
          serving_weight_grams: 100,
          alt_measures: [{ serving_weight: 100, measure: 'g', seq: 1, qty: 1 }]

        }
      },
      userID: usersID
    }
  }

  const req = mockRequest({}, testFood)
  const res = mockResponse()
  await addTrackedFood(req as Request, res as Response)
  LogID = res.send.firstCall.args[0][0].LogID
  FoodID = res.send.firstCall.args[0][0].FoodID
})

test.after.always(async () => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail)
})

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  res.send = sinon.stub().returns(res)
  return res
}

const mockRequest = (sessionParams: object, sessionData: object) => {
  return {
    params: sessionParams,
    body: sessionData
  }
}

test('adding tracked food', async (t: ExecutionContext) => {
  const req = mockRequest({}, testFood)
  const res = mockResponse()
  await addTrackedFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('get tracked food', async (t: ExecutionContext) => {
  const req = mockRequest({ userID: usersID, date: todaysDate }, {})
  const res = mockResponse()
  await getTrackedFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('get specific tracked food', async (t: ExecutionContext) => {
  const req = mockRequest({ LogID }, {})
  const res = mockResponse()
  await getSpecificTrackedFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('update tracked food', async (t: ExecutionContext) => {
  const req = mockRequest({}, { Quantity: 1, Measure: 'g', LogID, Calories: 100 })
  const res = mockResponse()
  await updateTrackedFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('get food', async (t: ExecutionContext) => {
  const req = mockRequest({ FoodID }, { })
  const res = mockResponse()
  await getFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('delete tracked food', async (t: ExecutionContext) => {
  const req = mockRequest({}, { LogID })
  const res = mockResponse()
  await deleteTrackedFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('get multiple foods', async (t: ExecutionContext) => {
  const req = mockRequest({}, { foodIDs: [FoodID] })
  const res = mockResponse()
  await getMultipleFood(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

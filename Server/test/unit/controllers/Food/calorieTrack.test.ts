import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
import { type ExecutionContext } from 'ava'
import * as calorieFunctions from './../../../../routes/Food/calorieTrack.controller'
import test from 'ava'
import sinon from 'sinon'
const supabaseQuery = new SupabaseQueryClass()

let randomEmail: string
let usersID = ''
const todaysDate = new Date().toISOString().split('T')[0]
let calorieGoalID: string

test.before(async (t: any) => {
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
  }

  const req = mockRequest({}, { UserID: usersID, CalorieGoal: 999, Date: todaysDate })
  const res = mockResponse()
  await calorieFunctions.insertCalorieGoal(req as Request, res as Response)
  // First call returns an array of objects we get the first one,
  // that object itself is an array and we get the first element of that array which contains the id of the inserted row

  calorieGoalID = res.send.firstCall.args[0][0].id
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

test('insert calorieGoal correctly', async (t: ExecutionContext) => {
  const req = mockRequest({}, { UserID: usersID, CalorieGoal: 4000, Date: todaysDate })
  const res = mockResponse()
  await calorieFunctions.insertCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('insert calorieGoal with invalid UserID', async (t: ExecutionContext) => {
  const req = mockRequest({}, { UserID: 'Wrong ID', CalorieGoal: 4000, Date: todaysDate })
  const res = mockResponse()
  await calorieFunctions.insertCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(400))
})

test('read all calorieGoals correctly', async (t: ExecutionContext) => {
  const req = mockRequest({ UserID: usersID }, {})
  const res = mockResponse()
  await calorieFunctions.readAllCalorieGoals(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('read specific calorieGoal', async (t: ExecutionContext) => {
  const req = mockRequest({ id: calorieGoalID }, { })
  const res = mockResponse()
  await calorieFunctions.readSpecificCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('update specific Calorie Goal', async (t: ExecutionContext) => {
  const req = mockRequest({ }, { CalorieGoal: 2001, id: calorieGoalID })
  const res = mockResponse()
  await calorieFunctions.updateSpecificCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('delete specific Calorie Goal', async (t: ExecutionContext) => {
  const req = mockRequest({ }, { id: calorieGoalID })
  const res = mockResponse()
  await calorieFunctions.deleteSpecificCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

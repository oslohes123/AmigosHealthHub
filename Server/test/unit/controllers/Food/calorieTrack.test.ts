import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
import { type ExecutionContext } from 'ava'
import { insertCalorieGoal, readAllCalorieGoals } from './../../../../routes/Food/calorieTrack.controller'
import test from 'ava'
import sinon from 'sinon'
const supabaseQuery = new SupabaseQueryClass()

let randomEmail: string
let usersID = ''
const todaysDate = new Date().toISOString().split('T')[0]
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

  const req = mockRequest({}, { UserID: usersID, CalorieGoal: 2000, Date: todaysDate })
  const res = mockResponse()
  await insertCalorieGoal(req as Request, res as Response)
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
  await insertCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

test('insert calorieGoal with invalid UserID', async (t: ExecutionContext) => {
  const req = mockRequest({}, { UserID: 'Wrong ID', CalorieGoal: 4000, Date: todaysDate })
  const res = mockResponse()
  await insertCalorieGoal(req as Request, res as Response)
  t.true(res.status.calledWith(400))
})

test('read all calorieGoals correctly', async (t: ExecutionContext) => {
  const req = mockRequest({ UserID: usersID }, {})
  const res = mockResponse()
  await readAllCalorieGoals(req as Request, res as Response)
  t.true(res.status.calledWith(200))
})

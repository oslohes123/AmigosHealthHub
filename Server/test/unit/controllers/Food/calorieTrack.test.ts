import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
import { type ExecutionContext } from 'ava'
import { insertCalorieGoal } from './../../../../routes/Food/calorieTrack.controller'
const test = require('ava')
const sinon = require('sinon')
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

test('testing Inserting a correct calorie Goal', async (t: ExecutionContext) => {
  console.log('usersID: ', usersID)
  const req = mockRequest({}, { UserID: usersID, CalorieGoal: 2000, Date: todaysDate })
  const res = mockResponse()
  await insertCalorieGoal(req as Request, res as Response)
  console.log('Response status: ', res.status)

  t.true(res.status.calledWith(200))
})

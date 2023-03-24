import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
// import supabase from '../../../../utils/supabaseSetUp'
// import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getCaloriesToday } from '../../../../routes/Exercise/exerciseCalories.controller'
import test from 'ava'
import sinon from 'sinon'
import createNewWorkoutPlan from '../../../../utils/Exercise/createNewWorkoutPlan'
// const supabaseQuery = new SupabaseQueryClass()
let randomEmail: string
const uuid = uuidv4()
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Calories',
    lastName: 'User',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
})

const mockRequest = (sessionData: any) => {
  return {
    headers: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  return res
}
test.after.always('guaranteed cleanup of user', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

test.serial('getCaloriesToday with no userid provided should return error', async (t: any) => {
  const req = mockRequest({})
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)

  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'userid does not follow the schema' }))
})

test.serial('user with no workouts has burnt 0 calories', async (t: any) => {
  const req = mockRequest({ userid: uuid })
  const res = mockResponse()
  await getCaloriesToday(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'User has no workouts!', totalCaloriesBurnt: 0 }))
})

// test('getCaloriesToday with user with a valid workoutplan returns the number of calories burnt', async (t: any) => {
//   // const exercises = {

//   // }
// createNewWorkoutPlan(uuid, 'TestWorkoutPlan', )
// })

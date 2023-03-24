// import { type Request, type Response } from 'express'
// import { changePassword } from '../../../../routes/User/changeProfileDetails.controller'
import { v4 as uuidv4 } from 'uuid'
// import supabase from '../../../../utils/supabaseSetUp'
// import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import { getCaloriesToday } from '../../../../routes/Exercise/exerciseCalories.controller'
import test from 'ava'
import sinon from 'sinon'
// const bcrypt = require('bcrypt')
// const supabaseQuery = new SupabaseQueryClass()
let randomEmail: string

test.before(async (t: any) => {
  const uuid = uuidv4()
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

test('passing test ', (t: any) => {
  t.pass()
})

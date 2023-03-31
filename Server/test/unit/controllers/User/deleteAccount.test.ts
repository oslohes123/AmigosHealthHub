import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/General/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/General/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/User/userFunctions'
import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { deleteAccount } from '../../../../routes/User/changeProfileDetails.controller'
const supabaseQuery = new SupabaseQueryClass()

let randomEmail: string
let usersID = ''
const testingPassword: string = 'CorrectPassword123!'

test.before(async (t: ExecutionContext) => {
  const uuid = uuidv4()
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword(testingPassword)

  const { data, error }: any = await createUser({
    firstName: 'DeleteAccountTest',
    lastName: 'DeleteAccountTest',
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

const mockRequest = (sessionParams: object, sessionData: object) => {
  return {
    params: sessionParams,
    body: sessionData
  }
}

const mockResponse = () => {
  const res: any = {}
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub().returns(res)
  res.send = sinon.stub().returns(res)
  return res
}

test('account is deleted', async (t: ExecutionContext) => {
  const req = mockRequest({}, { userid: usersID, password: testingPassword })
  const res = mockResponse()
  await deleteAccount(req as Request, res as Response)
  t.is(res.status.firstCall.args[0], 200)
  t.is(res.json.firstCall.args[0].mssg, 'Account Deleted!')

  // Find the user in the database
  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User', 'id', usersID, '*')

  t.is(data.length, 0)
  t.is(error, undefined)
}
)

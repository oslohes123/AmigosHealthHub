import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createHashedPassword, createUserWithID, deleteUserRow } from '../../../../utils/userFunctions'
import cloneDeep from 'lodash/cloneDeep'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
import { getExerciseHistory } from '../../../../routes/Exercise/exerciseHistory.controller'
const uuid = uuidv4()
const randomEmail = `${uuid}@example.com`
test.before(async (t: any) => {
  const hashedPassword = await createHashedPassword('Password123!')
  const { error } = await createUserWithID({
    id: uuid,
    firstName: 'firstName',
    lastName: 'lastName',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })
  if (error) {
    t.fail(JSON.stringify(error))
  }
})
test.after.always(async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail('Deleting user went wrong!')
  }
  const { errorDeletingMultipleExercises }: any = await deleteMultipleExercises([{ name: `Test Curl ${uuid}` }, { name: `Slow Jog ${uuid}` }])
  if (errorDeletingMultipleExercises) {
    t.fail(JSON.stringify(errorDeletingMultipleExercises))
  }
})

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
interface getExerciseHistoryRequest {
  userid?: string
  nameofexercise?: string
}
const validRequest: getExerciseHistoryRequest = {
  userid: uuid,
  nameofexercise: `Random ${uuid} exercise`
}

test.serial('getExerciseHistory returns error when userid is missing', async (t: any) => {
  const invalidRequestWithoutUserid = cloneDeep(validRequest)
  delete invalidRequestWithoutUserid.userid
  const req = mockRequest(invalidRequestWithoutUserid)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getExerciseHistory returns error when workoutname is missing', async (t: any) => {
  const invalidRequestWithoutNameofexercise = cloneDeep(validRequest)
  delete invalidRequestWithoutNameofexercise.nameofexercise
  const req = mockRequest(invalidRequestWithoutNameofexercise)
  const res = mockResponse()
  await getExerciseHistory(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Select an exercise!', dev: 'JSON instance does not follow the JSON schema' }))
})

import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createUserWithID, deleteUserRow, createHashedPassword } from '../../../../utils/userFunctions'
import { deleteTrackedWorkout, getWorkoutHistoryByDate } from '../../../../routes/Exercise/completedWorkouts.controller'
import cloneDeep from 'lodash/cloneDeep'
import { setUpCompletedWorkoutForTests } from '../../../../utils/Exercise/setUpCompletedWorkoutForTests'
// import { selectAllActualExercises, selectAllCompletedWorkoutNames, selectAllTrackedWorkoutsWithExercises } from '../../../../utils/Exercise/exerciseFunctions'
import { getTime, getTodaysDate, getDate } from '../../../../utils/convertTimeStamptz'
import { deleteMultipleExercises } from '../../../../utils/Exercise/insertAndDeleteMultipleExercises'

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
interface getWorkoutHistoryByDateRequest {
  userid?: string
  date?: string
}
const validRequest: getWorkoutHistoryByDateRequest = {
  userid: uuid,
  date: getTodaysDate()
}

test.serial('getWorkoutHistoryByDate returns error when userid is missing', async (t: any) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.userid
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

test.serial('getWorkoutHistoryByDate returns error when date is missing', async (t: any) => {
  const invalidRequest = cloneDeep(validRequest)
  delete invalidRequest.date
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getWorkoutHistoryByDate(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong!', dev: 'JSON instance does not follow the JSON schema' }))
})

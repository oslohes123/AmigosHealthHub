import test from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { getExerciseByName } from '../../../../routes/Exercise/searchExercise.controller'
import cloneDeep from 'lodash/cloneDeep'

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

interface getExerciseByNameRequest {
  exercisename?: string
}
const validRequest: getExerciseByNameRequest = {
  exercisename: 'bench press'
}

test('getExerciseByName with missing exercisename results in error', async (t: any) => {
  const invalidReqWithNoExercisename = cloneDeep(validRequest)
  delete invalidReqWithNoExercisename.exercisename
  const req = mockRequest(invalidReqWithNoExercisename)
  const res = mockResponse()
  await getExerciseByName(req as Request, res as Response)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'Something went wrong', dev: 'JSON instance does not follow JSON schema' }))
})

test('getExerciseByName with correct exercisename results in success', async (t: any) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await getExerciseByName(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getExerciseByName: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Exercise Matched!')
  t.true(argsPassed.exerciseInformation.name === 'Dumbbell Bench Press')
})

test('getExerciseByName with random and incorrect exercisename results in error', async (t: any) => {
  const invalidRequest = cloneDeep(validRequest)
  invalidRequest.exercisename = 'asdad1d12wdasdaasdsd'
  const req = mockRequest(invalidRequest)
  const res = mockResponse()
  await getExerciseByName(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in getExerciseByName3: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(400))
  t.true(res.json.calledWith({ mssg: 'No exercise of that name was found!' }))
})

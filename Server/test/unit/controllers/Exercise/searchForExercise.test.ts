import test from 'ava'
import { type ExecutionContext } from 'ava'
import sinon from 'sinon'
import { type Request, type Response } from 'express'
import { searchForExercise } from '../../../../routes/Exercise/searchExercise.controller'
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

interface searchForExerciseRequest {
  wordtosearch?: string
}
const validRequest: searchForExerciseRequest = {
  wordtosearch: 'bench press'
}

// test searchForExercise when wordtosearch is empty

test('searchForExercise with empty word results in empty array and success', async (t: ExecutionContext) => {
  const validRequestWithNoWordtosearch = cloneDeep(validRequest)
  delete validRequestWithNoWordtosearch.wordtosearch
  const req = mockRequest(validRequestWithNoWordtosearch)
  const res = mockResponse()
  await searchForExercise(req as Request, res as Response)
  t.true(res.status.calledWith(200))
  t.true(res.json.calledWith({ mssg: 'wordtosearch is empty', searchedWords: [] }))
})

test('searchForExercise with bench press results in success', async (t: ExecutionContext) => {
  const req = mockRequest(validRequest)
  const res = mockResponse()
  await searchForExercise(req as Request, res as Response)
  const argsPassed = res.json.getCall(0).args[0]
  t.log(`argsPassed in searchForExercise: ${JSON.stringify(argsPassed)}`)
  t.true(res.status.calledWith(200))
  t.true(argsPassed.mssg === 'Successful Search!')
  t.true(argsPassed.searchedWords.length > 0)
})

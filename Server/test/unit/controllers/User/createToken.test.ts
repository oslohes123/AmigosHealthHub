import { createToken } from '../../../../utils/userFunctions'
import { v4 as uuidv4 } from 'uuid'
require('dotenv').config()
import test from 'ava'
import { type ExecutionContext } from 'ava'
const jwt = require('jsonwebtoken')

test('createToken results in legitimate token', (t: ExecutionContext) => {
  const uuid = uuidv4()
  const token = createToken(uuid).split(' ')[1] // default second param is correct secret in .env

  try {
    // if jwt doesn't verify, it throws an error
    const decodedToken = jwt.verify(token, process.env.JWTSECRET)
    t.true(decodedToken.id === uuid) // token payload
  } catch (err) {
    t.fail('JWT did not verify')
  }
})

test('createToken with incorrect secret results in illegitimate token ', (t: ExecutionContext) => {
  const uuid = uuidv4()
  const secret = uuidv4()
  const token = createToken(uuid, secret).split(' ')[1]

  t.throws(() => {
    jwt.verify(token, process.env.JWTSECRET)
  })
})

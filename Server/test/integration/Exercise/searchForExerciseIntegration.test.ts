import app from '../../../index'
import test from 'ava'
import request from 'supertest'
import { v4 as uuidv4 } from 'uuid'
import RouteNamesClass from '../../../utils/routeNamesClass'
import { createUserWithID, createHashedPassword, createToken, deleteUserRow } from '../../../utils/userFunctions'
import { cloneDeep } from 'lodash'
const routeNames = new RouteNamesClass()
const searchExerciseRoute = routeNames.fullSearchExerciseURL

let randomEmail: string
const uuid = uuidv4()
let token: string
test.before(async (t: any) => {
  randomEmail = `${uuid}@gmail.com`

  const hashedPassword = await createHashedPassword('CorrectPassword123!')

  const { error }: any = await createUserWithID({
    id: uuid,
    firstName: 'Jane',
    lastName: 'Doe',
    email: randomEmail,
    password: hashedPassword,
    age: 20
  })

  if (error) {
    t.fail('Inserting user went wrong!')
  }
  token = createToken(uuid)
})

test.after.always('guaranteed cleanup of user and delete exercises', async (t: any) => {
  const { error } = await deleteUserRow(randomEmail)
  if (error) {
    t.fail(`deleteUserRow of ${randomEmail} failed`)
  }
})

interface searchForExerciseRequest {
  wordtosearch?: string
}
const validRequest: searchForExerciseRequest = {
  wordtosearch: 'bench press'
}

test('searchExerciseRoute is correct', (t: any) => {
  t.true(searchExerciseRoute === '/api/user/exercise/search')
})
// test searchForExercise when wordtosearch is empty

test('searchForExercise with empty word results in empty array and success', async (t: any) => {
  const validRequestWithNoWordtosearch = cloneDeep(validRequest)
  delete validRequestWithNoWordtosearch.wordtosearch
  const response = await request(app)
    .get(searchExerciseRoute)
    .set({ authorization: token, ...validRequestWithNoWordtosearch })
  t.true(response.status === 200)
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'wordtosearch is empty', searchedWords: [] }))
})

test('searchForExercise with bench press results in success', async (t: any) => {
  const response = await request(app)
    .get(searchExerciseRoute)
    .set({ authorization: token, ...validRequest })
  t.true(response.status === 200)
  t.true(response.body.mssg === 'Successful Search!')
  t.true(response.body.searchedWords.length > 0)
})

import app from '../../../index'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../utils/databaseInterface'
import { createHashedPassword, createToken } from '../../../utils/userFunctions'
import RouteNamesClass from '../../../utils/routeNamesClass'
const test = require('ava')
const request = require('supertest')
const bcrypt = require('bcrypt')
const supabaseQuery = new SupabaseQueryClass()
const routeNames = new RouteNamesClass()
const changePasswordRoute = routeNames.fullChangePasswordURL

let testEmail: string
let hashedPassword: string
let token: string

test.before(async (t: any) => {
    const uuid = uuidv4();
    testEmail = `${uuid}@gmail.com`
 
    hashedPassword = await createHashedPassword("OriginalPassword123!")
    await supabaseQuery.insert(supabase, 'User',{firstName: "First", lastName:"User", 
    email:testEmail, password: hashedPassword, age: "31"});
    
    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',testEmail,'id');
    if(error){
        t.fail("Inserting first user failed!");
    }
    token = createToken(data[0].id)
  })
  

  test.after.always('guaranteed cleanup of user', async (t: any) => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail);
  });

  const { data, error }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'id')
  if (error) {
    t.fail('Inserting first user failed!')
  }
  token = createToken(data[0].id)
})

test.after.always(async (t: any) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail)
})

test(`POST ${changePasswordRoute} with no fields`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({})

  console.log(`response: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changePasswordRoute} with no email`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      oldPassword: 'OriginalPassword123!',
      newPassword: 'NewPassword123!'
    })

  console.log(`response: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changePasswordRoute} with no oldPassword`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      email: testEmail,
      newPassword: 'NewPassword123!'
    })

  console.log(`response: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changePasswordRoute} with no newPassword`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      email: testEmail,
      oldPassword: 'OriginalPassword123!'
    })

  console.log(`response: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'All Fields Must Be Filled' }))
})

test(`POST ${changePasswordRoute} with non-existent user email `, async (t: any) => {
  const uuid = uuidv4()
  const randomEmail: string = `${uuid}@gmail.com`

  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      email: randomEmail,
      oldPassword: 'OriginalPassword123!',
      newPassword: 'NewPassword123!'
    })

  console.log(`response: ${JSON.stringify(response)}`)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Email doesn't exist in our database" }))
})

test(`POST ${changePasswordRoute} with incorrect original password`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      email: testEmail,
      oldPassword: 'IncorrectPassword123!',
      newPassword: 'NewPassword123!'
    })
  const { data }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'password')

  const correctMatch = await bcrypt.compare('OriginalPassword123!', data[0].password)
  const incorrectMatch = await bcrypt.compare('IncorrectPassword123!', data[0].password)
  t.falsy(incorrectMatch)
  t.truthy(correctMatch)
  t.true(response.status === 400)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: "Old password doesn't match!" }))
})

test(`POST ${changePasswordRoute} with correct original password`, async (t: any) => {
  const response = await request(app)
    .post(changePasswordRoute)
    .set('authorization', token)
    .send({
      email: testEmail,
      oldPassword: 'OriginalPassword123!',
      newPassword: 'NewPassword123!'
    })
  const { data }: any = await supabaseQuery.selectWhere(supabase, 'User'
    , 'email', testEmail, 'password')

  const match = await bcrypt.compare('NewPassword123!', data[0].password)
  t.truthy(match)

  t.true(response.status === 200)
  t.true(response.headers['content-type'] === 'application/json; charset=utf-8')
  t.true(JSON.stringify(response.body) === JSON.stringify({ mssg: 'New Password Set!' }))
})

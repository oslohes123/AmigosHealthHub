import app from '../../../index'
const request = require('supertest');
const test = require('ava');
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { SupabaseQueryClass } from '../../../utils/databaseInterface';
import { createHashedPassword } from '../../../utils/userFunctions';
const databaseQuery = new SupabaseQueryClass();
import RouteNamesClass from '../../../utils/routeNamesClass';
const routeNames = new RouteNamesClass()
import { createToken } from '../../../utils/userFunctions';
/**
 * Refactor using objects, interfaces to prevent repeated code. 
 */
const rateMentalRoute = routeNames.fullRateMentalURL;


let randomEmail:string;
const uuid = uuidv4();
randomEmail = `${uuid}@gmail.com`
let token: string;
test.serial.before(async (t : any) => {
    const uuid = uuidv4();
    
    
    const hashedPassword = await createHashedPassword("CorrectPassword123!")
    // const {data, error}:any = await createUser({id: uuid, firstName: "First", lastName:"User", 
    // email:randomEmail, password: hashedPassword, age: 31});
    console.log(`Inserting user`)
    const {data, error}:any = await databaseQuery.insert(supabase, `User`, {id: uuid, firstName: "First", lastName:"User", 
    email:randomEmail, password: hashedPassword, age: 31})
   
    if(error){
        // console.log(`MHtesterror:${error}`);
        t.fail(`Inserting user: ${JSON.stringify(error)}`);
    }
})

test.serial.before(async (t:any) => {
    const{data, error}:any = await databaseQuery.selectWhere(supabase,'User'
    ,'email',randomEmail,'id');
    if(error){
        t.fail("Inserting first user failed!");
    }
    token = createToken(data[0].id)
})

// test.before(async (t : any) => {
//     console.log(`8th executed!`)
//     const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '1',created_at: '2020-03-08 00:00:00+00', todays_word: 'Awful'})

//     if(error){
//         // console.log()
//         t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
//     }
// })


test.after.always('guaranteed cleanup', async (t: any) => {
    console.log(`test.after.always executed!`)
    // await databaseQuery.deleteFrom(supabase, "Mental Health", "user_id", uuid);
    await databaseQuery.deleteFrom(supabase, 'User', 'id',uuid);
});



// test(`POST ${rateMentalRoute} with incorrect ID`, async (t: any) => {
//     const response = await request(app)
//    .get(rateMentalRoute)
//    .set({"authorization":token, "id": wrong_uuid})
//    //add body as well
 
//    t.true(response.status === 400)
//    t.true(response.headers['content-type'] === "application/json; charset=utf-8")
//    t.true(JSON.stringify(response.body) === JSON.stringify({mssg : "Failed to retrieve last 7 faces"}));
//  })
 test(`POST ${rateMentalRoute} without being logged in`, async (t: any) => {
    const response = await request(app)
   .post(rateMentalRoute)
   .send({face: 4, word: "Happy", id: null})
   .set("authorization", token)

   console.log(`noIDResponse: ${JSON.stringify(response.body)}`)
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg:"You must be logged in to submit data"}));
 })

 test(`POST ${rateMentalRoute} with no word inputted`, async (t: any) => {
    const response = await request(app)
   .post(rateMentalRoute)
   .send({face: 4, word: "", id: uuid})
   .set("authorization", token)

   console.log(`noWordResponse ${JSON.stringify(response.body)}`) // "You must be logged in"
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg:"Can't submit an empty word"}));
 }) 

 
 test(`POST ${rateMentalRoute} with face value too low`, async (t: any) => {
    const response = await request(app)
   .post(rateMentalRoute)
   .send({face: 0, word: "Depressed", id: uuid})
   .set("authorization", token)

   console.log(`lowFaceValueResponse: ${JSON.stringify(response.body)}`)
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg:"Face value must be between 1-5"}));
 })
 
 test(`POST ${rateMentalRoute} with face value too high`, async (t: any) => {
    const response = await request(app)
   .post(rateMentalRoute)
   .send({face: 6, word: "Ecstatic", id: uuid})
   .set("authorization", token)

   console.log(`highFaceValueResponse: ${JSON.stringify(response.body)}`)
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg:"Face value must be between 1-5"}));
 })

 test(`POST ${rateMentalRoute} with correct input`, async (t: any) => {
    const response = await request(app)
   .post(rateMentalRoute)
   .send({face: 4, word: "Happy", id: uuid})
   .set("authorization", token)

   const{data, error}:any = await databaseQuery.selectWhere(supabase,'Mental Health'
   ,'user_id',uuid,'*');

   console.log(`correctInput: ${JSON.stringify(response.body)}`)
   console.log(`data[0]: ${JSON.stringify(data[0])}`)
   t.true(response.status === 200)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg:"Successful Submission"}));
 })
 
//    const expectedArgs = {
//     mssg: "Retrieved faces",
//     faces: ["1","2","3","4","1","3","2"],
//     average: 2.2857142857142856,
//     success: "successful"
// }
//    t.true(response.status === 200)
//    t.true(response.headers['content-type'] === "application/json; charset=utf-8")
//    t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs));
//  })
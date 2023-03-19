import app from "../../../index";
const request = require('supertest');
const test = require('ava');
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { SupabaseQueryClass } from "../../../utils/databaseInterface";
import { createHashedPassword } from "../../../utils/userFunctions";
const databaseQuery = new SupabaseQueryClass();
import RouteNamesClass from "../../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
import { createToken } from "../../../utils/userFunctions";
import { getDate } from "../../../utils/convertTimeStamptz";
import moment from "moment";
/**
 * Refactor using objects, interfaces to prevent repeated code. 
 */
const todaysWordRoute = routeNames.fullTodaysWordURL;


let randomEmail:string;
const uuid = uuidv4();
const wrong_uuid = '1a-2345-6b7c-890d-e01f2ghij34k'
randomEmail = `${uuid}@gmail.com`
let token: string;
let todayDate = getDate(moment().format());
test.serial.before(async (t : any) => {
    // const uuid = uuidv4();
    
    
    const hashedPassword = await createHashedPassword("CorrectPassword123!")
    // const {data, error}:any = await createUser({id: uuid, firstName: "First", lastName:"User", 
    // email:randomEmail, password: hashedPassword, age: 31});
    console.log(`Inserting user`)
    const {data, error}:any = await databaseQuery.insert(supabase, `User`, {id: uuid, firstName: "First", lastName:"User", 
    email:randomEmail, password: hashedPassword, age: 31})
   
    if(error){
        // console.log(`MHtesterror:${error}`);
        t.fail(`Insering user: ${JSON.stringify(error)}`);
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
test.before(async (t : any) => {
    console.log(`9th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health",
     {user_id: uuid, face_id: '1',created_at: todayDate, todays_word: 'Awful'});

    if(error){
        // console.log()
        t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
    }
})

test.after.always('guaranteed cleanup', async (t: any) => {
    console.log(`test.after.always executed!`)
    await databaseQuery.deleteFrom(supabase, "Mental Health", "user_id", uuid);
    await databaseQuery.deleteFrom(supabase, 'User', 'id',uuid);
});



test(`GET ${todaysWordRoute} with incorrect ID`, async (t: any) => {
    const response = await request(app)
   .get(todaysWordRoute)
   .set({"authorization":token, "id": wrong_uuid})

   console.log(`incorrectIDError: ${ JSON.stringify(response.body) }`)
   t.true(response.status === 400)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify({mssg : "Something went wrong!"}))
});
//  })
 test(`GET ${todaysWordRoute} with correct ID`, async (t: any) => {
    const response = await request(app)
   .get(todaysWordRoute)
   .set({"authorization":token, "id": uuid})
    
   const expectedArgs = {
    mssg: "Here is today's word!",
    word: [
        {"todays_word": "Awful"}
    ]
}
    console.log(`correcttodaysword ${ JSON.stringify(response.body) }`)
   t.true(response.status === 200)
   t.true(response.headers['content-type'] === "application/json; charset=utf-8")
   t.true(JSON.stringify(response.body) === JSON.stringify(expectedArgs));
 })

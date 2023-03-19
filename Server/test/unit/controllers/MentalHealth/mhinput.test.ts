const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { insertMentalData } from '../../../../routes/MentalHealth/rateMental.controller';
import { SupabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
import {v4 as uuidv4} from 'uuid';
import { createHashedPassword, createUser } from '../../../../utils/userFunctions';
import { getDate } from '../../../../utils/convertTimeStamptz';
import moment from 'moment';


const databaseQuery = new SupabaseQueryClass();

let randomEmail:string;
const uuid = uuidv4();
const wrong_uuid = '1a-2345-6b7c-890d-e01f2ghij34k'
randomEmail = `${uuid}@gmail.com`
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
        t.fail(`Inserting user: ${JSON.stringify(error)}`);
    }
})

// test.before(async (t : any) => {
//     console.log(`9th executed!`)
//     const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", 
//     {user_id: uuid, face_id: '1',created_at: todayDate, todays_word: 'Awful'});

//     if(error){
//         // console.log()
//         t.fail(`MHtesterror9: ${JSON.stringify(error)}`)
//     }
// })



test.after.always('guaranteed cleanup', async (t: any) => {
    console.log(`test.after.always executed!`)
    // await databaseQuery.deleteFrom(supabase, "Mental Health", "user_id", uuid);
    await databaseQuery.deleteFrom(supabase, 'User', 'id', uuid);
});

const mockResponse = () => {
    let res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const mockRequest = (sessionData: any) => {
    return {
        body: sessionData
    }
}
test("Attempt to insert data without logging in", async (t: any) => {

    const req = mockRequest({
        face: 4,
        word: "Happy",
        id: null,
    });
    const res = mockResponse();
    await insertMentalData(req as Request, res as Response)


    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed incorrectID: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg:"You must be logged in to submit data"}));
});


test("Attempt to insert data with an empty word", async (t: any) => {

    const req = mockRequest({
        face: 2,
        word: "",
        id: uuid
    });
    const res = mockResponse();
    await insertMentalData(req as Request, res as Response)
    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed1: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledOnceWith({mssg:"Can't submit an empty word"}))
});

test("Attempt to insert data with a face value too high", async (t: any) => {

    const req = mockRequest({
        face: 6,
        word: "Ecstatic",
        id: uuid
    });
    const res = mockResponse();
    await insertMentalData(req as Request, res as Response)
    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed2: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledOnceWith({mssg:"Face value must be between 1-5"}))
});

test("Attempt to insert data with a face value too low", async (t: any) => {

    const req = mockRequest({
        face: 0,
        word: "awful",
        id: uuid
    });
    const res = mockResponse();
    await insertMentalData(req as Request, res as Response)
    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed3: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledOnceWith({mssg:"Face value must be between 1-5"}))
});

test("Insert correct data into database", async (t: any) => {

    const req = mockRequest({
        face: 1,
        word: "Awful",
        id: uuid
    });
    const res = mockResponse();
    await insertMentalData(req as Request, res as Response)
    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed4: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(200))
    t.true(res.json.calledOnceWith({mssg:"Successful Submission"}))
})

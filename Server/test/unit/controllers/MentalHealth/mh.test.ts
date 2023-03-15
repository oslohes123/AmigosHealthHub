const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { faceValues, wordValues } from '../../../../routes/MentalHealth/mhGetStats.controller';
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
import {v4 as uuidv4} from 'uuid';
import { createHashedPassword, createUser } from '../../../../utils/userFunctions';


const databaseQuery = new supabaseQueryClass();

let randomEmail:string;
const uuid = uuidv4();
const wrong_uuid = '1a-2345-6b7c-890d-e01f2ghij34k'
randomEmail = `${uuid}@gmail.com`

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
test.before(async (t : any) => {
    console.log(`1st executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '5',created_at: '2020-03-01 00:00:00+00', todays_word: 'Happy'})

    if(error){
        
        // console.log(`MHtesterror: ${(error)}`
        t.fail(`inserting 1st mental health:${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`2nd executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '2',created_at: '2020-03-02 00:00:00+00', todays_word: 'Sad'})

    if(error){
        
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(`inserting 2nd mental health:${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`3rd executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '3',created_at: '2020-03-03 00:00:00+00', todays_word: 'Alright'})

    if(error){
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(t.fail(`inserting 3rd mental health:${JSON.stringify(error)}`))
    }
})
test.before(async (t : any) => {
    console.log(`4th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '1',created_at: '2020-03-04 00:03:00+00', todays_word: 'Awful'})

    if(error){
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(`MHtesterror4: ${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`5th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '4',created_at: '2020-03-05 00:00:00+00', todays_word: 'Happy'})

    if(error){
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(`MHtesterror5: ${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`6th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '3',created_at: '2020-03-06 00:00:00+00', todays_word: 'Mediocre'})

    if(error){
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(`MHtesterror6: ${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`7th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '2',created_at: '2020-03-07 00:00:00+00', todays_word: 'Depressed'})

    if(error){
        // console.log(`MHtesterror: ${JSON.stringify(error)}`)
        t.fail(`MHtesterror7: ${JSON.stringify(error)}`)
    }
})
test.before(async (t : any) => {
    console.log(`8th executed!`)
    const {data, error}:any = await databaseQuery.insert(supabase, "Mental Health", {user_id: uuid, face_id: '1',created_at: '2020-03-08 00:00:00+00', todays_word: 'Awful'})

    if(error){
        // console.log()
        t.fail(`MHtesterror8: ${JSON.stringify(error)}`)
    }
})

test.after.always('guaranteed cleanup', async (t: any) => {
    console.log(`test.after.always executed!`)
    await databaseQuery.deleteFrom(supabase, "Mental Health", "user_id", uuid);
    await databaseQuery.deleteFrom(supabase, 'User', 'id',uuid);
});

const mockResponse = () => {
    let res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
};

const mockRequest = (sessionData: any) => {
    return {
        headers: sessionData
    }
}
test("Return last 7 words and their frequencies with incorrect ID", async (t: any) => {

    console.log("In returning last 7 words and their frequencies")
    const req = mockRequest({
        id: wrong_uuid,
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)


    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed incorrectID: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : 'Failed to retrieve last 7 words'}));
});

test("Return last 7 words and their frequencies", async (t: any) => {

    console.log("In returning last 7 words and their frequencies with new ID")
    const req = mockRequest({
        id: uuid
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)
    const argsPassedFull = res.json.getCall(0);
    console.log(`argsPassedFull: ${JSON.stringify(argsPassedFull)}`)
    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed: ${JSON.stringify(argsPassed)}`)

    const expectedArgs = {
        "mssg":"MentalHealthOverview",
        "words":[
            {"todays_word":"Awful"},
            {"todays_word":"Depressed"},
            {"todays_word":"Mediocre"},
            {"todays_word":"Happy"},
            {"todays_word":"Awful"},
            {"todays_word":"Alright"},
            {"todays_word":"Sad"}],
        "freq":["\"Awful\"","2","\"Depressed\"","1","\"Mediocre\"","1","\"Happy\"","1","\"Alright\"","1","\"Sad\"","1"]
    }
     const stringifiedExpectedArgs= JSON.stringify(expectedArgs)

    t.true(res.status.calledWith(200))
    t.true(res.json.calledOnceWith(argsPassed))
    t.true(JSON.stringify(argsPassed) == stringifiedExpectedArgs)
});
test("Getting last 7 faces and their average with an incorrect ID should result in an error", async (t: any) => {

    console.log("In returning last 7 faces and their average")
    const req = mockRequest({
        id: wrong_uuid,
    });
    const res = mockResponse();
    await faceValues(req as Request, res as Response)


    const argsPassed = res.json.getCall(0).args[0];
    console.log(`argspassed incorrectID: ${JSON.stringify(argsPassed)}`)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : "Failed to retrieve last 7 faces"}));
});
test("Return last 7 faces and their average with new ID", async (t: any) => {

    console.log("In returning last 7 faces and their average with new ID")
    const req = mockRequest({
        id: uuid
    });
    const res = mockResponse();
    await faceValues(req as Request, res as Response)
    const argsPassedFull = res.json.getCall(0);
    // console.log(`argsPassedFull: ${JSON.stringify(argsPassedFull)}`)
    const argsPassed = res.json.getCall(0).args[0];
    // console.log(`argspassed: ${JSON.stringify(argsPassed)}`)

    const expectedArgs = {
        mssg: "Retrieved faces",
        faces: ["1","2","3","4","1","3","2"],
        average: 2.2857142857142856,
        success: "successful"
    }
     const stringifiedExpectedArgs= JSON.stringify(expectedArgs)
    console.log(`argsPassed ln 233:${JSON.stringify(argsPassed)}`); //{"mssg":"Retrieved faces","faces":["1","2","3","4","1","3","2"],"average":2.2857142857142856,"success":"successful"}
    console.log(`stringifiedExpectedArgs ln 233:${stringifiedExpectedArgs}`)//{"mssg":"Retrieved faces","faces":[{"face_id":1},{"face_id":2},{"face_id":3},{"face_id":4},{"face_id":1},{"face_id":3},{"face_id":2}],"average":2.2857142857142856,"success":"successful"}
    t.true(res.status.calledWith(200))
    t.true(res.json.calledOnceWith(argsPassed)) 
    t.true(JSON.stringify(argsPassed) == stringifiedExpectedArgs)
});


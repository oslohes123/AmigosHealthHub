const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { wordValues } from "../../../../controllers/mhcontroller";
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
import {v4 as uuidv4} from 'uuid';
import { createHashedPassword, createUser, addMHSection } from '../../../../utils/userFunctions';


const supabaseQuery = new supabaseQueryClass();

let randomEmail:string;
const uuid = uuidv4();
randomEmail = `${uuid}@gmail.com`

test.before(async (t : any) => {
    // const uuid = uuidv4();
    
    
    const hashedPassword = await createHashedPassword("CorrectPassword123!")
    const {data, error}:any = await createUser({firstName: "First", lastName:"User", 
    email:randomEmail, password: hashedPassword, age: 31});
    
    if(error){
        t.fail()
    }
})
test.before(async (t : any) => {
    // const uuid = uuidv4();
    // randomEmail = `${uuid}@gmail.com`
    
    // const hashedPassword = await createHashedPassword("CorrectPassword123!")
    const {data, error}:any = await addMHSection({face_id: "4", created_at: '2020-03-01 00:00:00+00', todays_word: 'Happy'});
    
    if(error){
        t.fail()
    }
})



test.after(async() => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
    await supabaseQuery.deleteFrom(supabase, 'Mental Health', 'user_id', uuid);
})

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
test("Return last 7 words and their frequencies with an incorrect ID", async (t: any) => {

    console.log("In returning last 7 words and their frequencies with an incorrect ID")
    const req = mockRequest({
        id: '093724974890',
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : "Failed to return last 7 words"}));
});
// test("Return last 7 faces and their frequencies", async (t: any) => {

//     console.log("In returning last 7 words and their average")
//     const req = mockRequest({
//         id: '9d-1852-4c2d-802c-e10d3ebdc05b',
//     });
//     const res = mockResponse();
//     await wordValues(req as Request, res as Response)

//     t.true(res.status.calledWith(200))
// });
test("Return last 7 words and their frequencies with a new ID", async (t: any) => {

    console.log("In returning last 7 words and their frequencies with a new ID")
    const req = mockRequest({
        id: uuid,
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(200))
    t.true(res.json.calledWith({mssg : "Retrieved words"}));
});

test("Return last 7 words and their frequencies with an ID with multiple rows in the Mental Health database", async (t: any) => {

    console.log("In returning last 7 words and their frequencies with a correct ID")
    const req = mockRequest({
        id: uuid,
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(200))
    t.true(res.json.calledWith({mssg : "Retrieved words"}));
});

// test("Return last 7 faces", async (t: any) => {

//     console.log("In returning last 7 faces and their average")
//     const req = mockRequest({
//         id: 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
//     });
//     const res = mockResponse();
//     await faceValues(req as Request, res as Response)

//     t.true(res.status.calledWith(200))
// 

// })
test("Return last 7 words and their frequencies", async (t: any) => {

    console.log("In returning last 7 words and their frequencies")
    const req = mockRequest({
        id: 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
    });
    const res = mockResponse();
    await wordValues(req as Request, res as Response)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg : "Failed to return last 7 words"}));
});
// test("Return last 7 faces and their frequencies", async (t: any) => {

//     console.log("In returning last 7 words and their average")
//     const req = mockRequest({
//         id: '9d-1852-4c2d-802c-e10d3ebdc05b',
//     });
//     const res = mockResponse();
//     await wordValues(req as Request, res as Response)

//     t.true(res.status.calledWith(200))
// });
const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { changeStats } from '../../../controllers/changeProfileDetails';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();


//SetUp
let firstUserEmail: string;
let hashedPassword1 : string;
let secondUserEmail: string;
let hashedPassword2 : string;

const uuid = uuidv4();
const newEmail = `CHANGED${uuid}@gmail.com`

test.before(async (t: any) => {
  
  const uuid1 = uuidv4();
  firstUserEmail = `${uuid1}@gmail.com`

  const salt = await bcrypt.genSalt(10);
  hashedPassword1  = await bcrypt.hash("User1Password123!", salt);

  const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "First", lastName:"User", 
  email:firstUserEmail, password: hashedPassword1, age: 31});
  
  if(error){
      t.fail("Inserting second user failed!");
  }
})

test.before( async (t:any) => {
    const uuid2 = uuidv4();
    secondUserEmail = `${uuid2}@gmail.com`

    const salt = await bcrypt.genSalt(10);
    hashedPassword2  = await bcrypt.hash("User2Password123!", salt);
    console.log("In second user creation")
    const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "Second", lastName:"User", 
    email:secondUserEmail, password: hashedPassword2, age:30});
    console.log(data)
    if(error){
        t.fail("Inserting second user failed!");
    }
})


test.after(async(t: any) => {
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', firstUserEmail);
  await supabaseQuery.deleteFrom(supabase, 'User', 'email', newEmail);
})


const mockResponse = () => {
    let res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };

  const mockRequest = (sessionData : any) => {
    return {
      body: sessionData,
    };
  };


  /**
   * Test changeStats with any missing fields
   */

  test('changeStats with no fields should return error', async (t: any) => {
    const req = mockRequest({});
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('changeStats with missing first name should return error', async (t: any) => {
    const req = mockRequest({
        lastName: "Doe",
        prevEmail: "prevEmail@example.com",
        newEmail: "newEmail@example.com",
        age: 0
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });


  test('changeStats with missing last name should return error', async (t: any) => {
    const req = mockRequest({
        firstName: "John",
        prevEmail: "prevEmail@example.com",
        newEmail: "newEmail@example.com",
        age: 0
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('changeStats with missing prevEmail should return error', async (t: any) => {
    const req = mockRequest({
      firstName: "John",
      lastName: "Doe",
      newEmail: "newEmail@example.com",
      age: 0
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });
  test('sign up with missing newEmail should return error', async (t: any) => {
    const req = mockRequest({
        firstName: "John",
        lastName: "Doe",
        prevEmail: "prevEmail@example.com",
        age: 0
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('changeStats with missing age should return error', async (t: any) => {
    const req = mockRequest({
        firstName:"John",
        lastName: "Doe",
        prevEmail: "prevEmail@example.com",
        newEmail: "newEmail@example.com",
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  /**
   * Bad inputs for changeStats
   */

  test('changeStats with bad new email structure', async (t: any) => {
    const req = mockRequest({
        firstName:"John",
        lastName: "Doe",
        prevEmail: secondUserEmail,
        newEmail: "badEmaile.com",
        age: 30
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'Invalid New Email'}));
  
  });

  test('changeStats with new email that already exists results in error', async (t: any) => {
    const req = mockRequest({
        firstName:"John",
        lastName: "Doe",
        prevEmail: secondUserEmail,
        newEmail: firstUserEmail,
        age: 30
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: "Email Already Exists"}));
  
  });

  test('changeStats with new available email results in ', async (t: any) => {
    const req = mockRequest({
        firstName:"Second",
        lastName: "User",
        prevEmail: secondUserEmail,
        newEmail: newEmail,
        age: 30
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);

    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',newEmail,'*');
    

    t.true(res.status.calledWith(200))
    t.true(res.json.calledWith({mssg: "Successful New Email"}));
    t.true(data[0].email === newEmail);
    

  
  });

  test('changeStats with same email results in success', async (t: any) => {
    //change age 31 -> 33
    //change firstName "First" -> "Changedfirst"
    const req = mockRequest({
        firstName:"Changedfirst",
        lastName: "User",
        prevEmail: firstUserEmail,
        newEmail: firstUserEmail,
        age: 33 
    });
    const res = mockResponse();
    await changeStats(req as Request, res as Response);
    // await signupUser(req, res);

    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',firstUserEmail,'*');
    
    console.log(`data in changeStats: ${JSON.stringify(data)}`)

    t.true(res.status.calledWith(200))
    t.true(res.json.calledWith({mssg: "Successful Update"}));
    console.log(`firstName: ${data[0].firstName}`)
    t.true(data[0].firstName === "Changedfirst");
    t.true(data[0].age === 33);
    t.true(data[0].lastName === "User");
  });

  export{};
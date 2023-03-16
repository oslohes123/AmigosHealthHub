const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { getInfo } from '../../../../routes/User/getUserInfo.controller';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import { createHashedPassword } from '../../../../utils/userFunctions';
const supabaseQuery = new supabaseQueryClass();

const mockResponse = () => {
    let res: any = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    return res;
  };

  const mockRequest = (sessionData : any) => {
    return {
      headers: sessionData,
    };
  };
  
  let existingEmail: string;
  let hashedPassword: string;
  test.before(async (t: any) => {
    
    const uuid = uuidv4();
    existingEmail = `${uuid}@gmail.com`

    hashedPassword = await createHashedPassword("CorrectPassword123!")
    const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "Already", lastName:"Exists", 
    email:existingEmail, age: 30, password: hashedPassword});
    
    if(error){
        t.fail(error);
    }
})

test.after.always(async(t: any) => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', existingEmail);
  })

  test('getInfo with no fields results in error', async (t: any) => {
    const req = mockRequest({});
    const res = mockResponse();
    await getInfo(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'Email must be provided'}));
  
  });

  test('getInfo with non-existent user results in error', async (t: any) => {
    const randomEmail = `${uuidv4()}@gmail.com`
    const req = mockRequest({
        email: randomEmail
    });
    const res = mockResponse();
    await getInfo(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'User not found!'}));
  });

  test('getInfo with existing user results in success', async (t: any) => {
    const req = mockRequest({
        email: existingEmail
    });
    const res = mockResponse();
    await getInfo(req as Request, res as Response);
    const argsPassed = res.json.getCall(0).args[0];
    // const argsPassedStringified = JSON.stringify(res.json.getCall(0).args[0]);
    const argsUserPassedStringified = JSON.stringify(argsPassed.user);
    
    const expectedArgs = {
        "firstName": "Already",
        "lastName": "Exists",
        "email": existingEmail,
        "age": 30
    }
     const stringifiedExpectedArgs= JSON.stringify(expectedArgs)

     t.true(res.status.calledWith(200))
     t.true(res.json.calledOnceWith(argsPassed))
     t.true(argsUserPassedStringified == stringifiedExpectedArgs)
  });
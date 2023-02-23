// import {expect} from 'chai'
//11 tests
const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { signupUser } from '../../../controllers/userController';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();
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
  
  let alreadyExistsEmail: string;
  let hashedPassword: string;
  test.before(async (t: any) => {
    
    const uuid = uuidv4();
    alreadyExistsEmail = `${uuid}@gmail.com`

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash("CorrectPassword123!", salt);

    const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "already", lastName:"exists", 
    email:alreadyExistsEmail, password: hashedPassword});
    
    if(error){
        t.fail(error);
    }
})

  test.after(async(t: any) => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', alreadyExistsEmail);
  })
  //Missing fields for sign up form

  test('sign up with no fields should return error', async (t: any) => {
    const req = mockRequest({});
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('sign up with missing email should return error', async (t: any) => {
    const req = mockRequest({
      firstName: "John",
      lastName: "Doe",
      password: "CorrectPassword123!",
      age: 0
    });
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });
  test('sign up with missing password should return error', async (t: any) => {
    const req = mockRequest({
      firstName: "John",
      lastName: "Doe",
      email:"johndoe@gmail.com",
      age: 0
    });
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('sign up with missing last name should return error', async (t: any) => {
    const req = mockRequest({
      firstName: "John",
      email:"johndoe@gmail.com",
      password: "CorrectPassword123!",
      age: 0
    });
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('sign up with missing first name should return error', async (t: any) => {
    const req = mockRequest({
      email:"johndoe@gmail.com",
      lastName: "Doe",
      password: "CorrectPassword123!",
      age: 0
    });
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('sign up with missing age should return error', async (t: any) => {
    const req = mockRequest({
      firstName: "John",
      lastName: "Doe",
      password: "CorrectPassword123!",
      email:"johndoe@gmail.com",
    });
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });





/**
 * Test sign up form with invalid inputs eg. weak password
 */
  test('sign up with invalid email structure', async (t : any) => {
    const req = mockRequest(
                          {firstName: 'John',
                          lastName: 'Doe',
                          email: 'invalid-email',
                          password: '12345678',
                          age: 30,
                          }
                          );
    
    const res = mockResponse();

    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    // expect(res.json.calledOnce).to.be.true;
    // expect(res.json.args[0][0].mssg).to.equal('Invalid Email');
    t.true(res.json.calledWith({mssg: 'Invalid Email'}));
  });



  test('sign up should return error if first or last name contain non-letter characters', async (t: any) => {
   
    const req = mockRequest(
      {firstName: 'John1',
      lastName: 'Doe2',
      email: 'john.doe@example.com',
      password: 'CorrectPassword123!',
      age: 30,
      }
      );

    const res = mockResponse();

    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    // t.true(res.status.calledOnce);
    t.true(res.status.calledWith(400));
    // expect(res.json.calledOnce).to.be.true;
    t.true(res.json.calledWith({mssg:'First name and last name must only contains letters a-z or A-Z'}));
  });

  test('sign up should return error if password is weak', async (t: any) => {
    
    const req = mockRequest(
      {firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'weakPassword123',
      age: 30,
      }
      );

    const res = mockResponse();

    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    // expect(res.status.calledOnce).to.be.true;
    t.true(res.status.calledWith(400));
    // expect(res.json.calledOnce).to.be.true;
    t.true(res.json.calledWith({mssg:'Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol'}));
  });


  /**
   * Test sign up with taken email
   */

  test('sign up with already existing email results in error', async (t: any) => {
    
    const req = mockRequest(
      {firstName: "Different",
      lastName: "Name",
      password: "CorrectPassword123!",
      email: alreadyExistsEmail,
      age:30
      }
      );

    const res = mockResponse();

    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    // expect(res.status.calledOnce).to.be.true;
    t.true(res.status.calledWith(400));
    // expect(res.json.calledOnce).to.be.true;
    t.true(res.json.calledWith({mssg: "User already exists!"}));
  });

  test('sign up with valid details results in success', async (t: any) => {
    
    const uuid = uuidv4();
    const randomEmail = `${uuid}@gmail.com`

    const req = mockRequest(
      {firstName: "Jane",
      lastName: "Doe",
      password: "CorrectPassword123!",
      email: randomEmail,
      age:30
      }
      );

    const res = mockResponse();

    await signupUser(req as Request, res as Response);
    
    const argsPassed = res.json.getCall(0).args[0];
   
    t.true(res.status.calledWith(200))
    t.true(res.json.calledOnceWith(argsPassed))
    t.true(argsPassed.email == randomEmail)
    t.true(argsPassed.firstName == "Jane")
    t.true(argsPassed.mssg == "Successful sign up!")

    await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
  });



export {};
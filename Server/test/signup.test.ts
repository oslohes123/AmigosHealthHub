// import {expect} from 'chai'
const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { signupUser } from '../controllers/userController';


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
  


  test('sign up should return error if fields are missing', async (t: any) => {
    const req = mockRequest({});
    const res = mockResponse();
    await signupUser(req as Request, res as Response);
    // await signupUser(req, res);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
  
  });

  test('sign up should return error if email is invalid', async (t : any) => {
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

  test('should return error if first or last name contains non-letter characters', async (t: any) => {
   
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

  test('should return error if password structure is invalid', async (t: any) => {
    
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
export {};
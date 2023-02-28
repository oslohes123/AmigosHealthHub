const test = require('ava');
import { Request, Response, NextFunction } from 'express';
const sinon = require('sinon');
import { changeStats } from '../../../routes/changeProfileDetails.controller';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import { checkToken } from '../../../middleware/checkToken';
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();
const jwtToken = require('jsonwebtoken');
import { createToken } from '../../../utils/userFunctions';


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

test('checkToken with missing authorization header results in error', async (t: any) => {
    const req = mockRequest({});
    const res = mockResponse();
    // const next = mockNext();
    const next = sinon.fake()
    await checkToken(req as Request, res as Response, next as NextFunction);
    // await signupUser(req, res);
    t.true(next.callCount === 0);
    t.true(res.status.calledWith(401))
    t.true(res.json.calledWith({mssg: "No Authorization Header"}));
  
  });

  //Not in format 'bearer token'
  test('checkToken with authorization header with 0 spaces results in error', async (t: any) => {
    const req = mockRequest({
        authorization: "tokenvalue"
    });
    const res = mockResponse();
    // const next = mockNext();
    const next = sinon.fake()
    await checkToken(req as Request, res as Response, next as NextFunction);
    // await signupUser(req, res);
    t.true(next.callCount === 0);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: "Authorization header must have format 'bearer token'."}));
  
  });

  test('checkToken with no bearer substring in authorization header results in error', async (t: any) => {
    const req = mockRequest({
        authorization: " tokenvalue"
    });
    const res = mockResponse();
    // const next = mockNext();
    const next = sinon.fake()
    await checkToken(req as Request, res as Response, next as NextFunction);
    // await signupUser(req, res);
    t.true(next.callCount === 0);
    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: "Authorization header must have format 'bearer token'."}));
  
  });

  test('checkToken with illegitimate token in authorization header results in error', async (t: any) => {
    const req = mockRequest({
        authorization: "bearer tokenvalue"
    });
    const res = mockResponse();
    // const next = mockNext();
    const next = sinon.fake()
    await checkToken(req as Request, res as Response, next as NextFunction);
    // await signupUser(req, res);
    t.true(next.callCount === 0);
    t.true(res.status.calledWith(401))
    t.true(res.json.calledWith({mssg: "Request Failed due to Authentication"}));
  
  });

  test('checkToken with jwttoken with incorrect payload results in error', async (t: any) => {
    
    //create token with this random uuid, token payload
    //id doesn't exist in database
    const uuid = uuidv4();
    const token = createToken(uuid)
  
    const req = mockRequest({
        authorization: token
    });
    const res = mockResponse();
    const next = sinon.fake()

    await checkToken(req as Request, res as Response, next as NextFunction);

    t.true(next.callCount === 0);
    t.true(res.status.calledWith(401));
    t.true(res.json.calledWith({mssg: "Request Failed due to Authentication"}));
  
  });

  test('checkToken with legitimate token results in error', async (t: any) => {
    
    const uuid = uuidv4();
    const testUser = `${uuid}@gmail.com`;

    const salt = await bcrypt.genSalt(10);
    
    const hashedPassword  = await bcrypt.hash("User1Password123!", salt);

    await supabaseQuery.insert(supabase, 'User',{firstName: "Test", lastName:"User", 
    email:testUser, password: hashedPassword, age: 31});
    
    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',testUser,'id');

    if(error){
        t.fail("Inserting and selecting user failed!");
    }
    console.log(`data[0].id : ${data[0].id}`)
    const token = createToken(data[0].id)
    const req = mockRequest({
        authorization: token
    });
    const res = mockResponse();
    const next = sinon.fake()
    await checkToken(req as Request, res as Response, next as NextFunction);
    // await signupUser(req, res);
    t.true(next.callCount === 1)

    await supabaseQuery.deleteFrom(supabase, 'User', 'email', testUser);
  });

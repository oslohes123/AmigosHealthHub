const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { changePassword } from '../../../routes/User/changeProfileDetails.controller';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
import { createHashedPassword, createUser } from '../../../utils/userFunctions';
const supabaseQuery = new supabaseQueryClass();

let testEmail: string;
let hashedPassword : string;


test.before(async (t: any) => {
    const uuid = uuidv4();
    testEmail = `${uuid}@gmail.com`

    hashedPassword = await createHashedPassword("OriginalPassword123!")
  
    const {data, error}:any = await createUser({firstName: "First", lastName:"User", 
    email:testEmail, password: hashedPassword, age: 31})
    
    if(error){
        t.fail("Inserting second user failed!");
    }
  })
  
  test.after(async(t: any) => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', testEmail);
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
     * Test changePassword with missing fields
     */

    test('changePassword with no fields should return error', async (t: any) => {
        const req = mockRequest({});
        const res = mockResponse();
        await changePassword(req as Request, res as Response);
        // await signupUser(req, res);
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
      
      });

      test('changePassword with no email should return error', async (t: any) => {
        const req = mockRequest({
            oldPassword: "OriginalPassword123!",
            newPassword:"NewPassword123!"
        });
        const res = mockResponse();
        await changePassword(req as Request, res as Response);
        // await signupUser(req, res);
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
      
      });

      test('changePassword with no oldPassword should returns error', async (t: any) => {
        const req = mockRequest({
            email:testEmail, 
            newPassword: "NewPassword123!",
        });
        const res = mockResponse();
        await changePassword(req as Request, res as Response);
        // await signupUser(req, res);
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
      
      });


      test('changePassword with no newPassword should returns error', async (t: any) => {
        const req = mockRequest({
            email:testEmail, 
            oldPassword: "OriginalPassword123!",
        });
        const res = mockResponse();
        await changePassword(req as Request, res as Response);
        // await signupUser(req, res);
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
      
      });

      test('changePassword with non-existent user email returns error', async (t: any) => {
      
        const uuid = uuidv4();
        let randomEmail: string= `${uuid}@gmail.com`

        const req = mockRequest({
            email:randomEmail, 
            oldPassword: "OriginalPassword123!",
            newPassword:"NewPassword123!"
        });
        const res = mockResponse();
        await changePassword(req as Request, res as Response);
        // await signupUser(req, res);
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: "Email doesn't exist in our database"}));
      
      });

      test('changePassword with incorrect original password results in error', async (t: any) => {
      

            const req = mockRequest({
                email:testEmail, 
                oldPassword: "IncorrectPassword123!",
                newPassword:"NewPassword123!"
            });
            const res = mockResponse();
            await changePassword(req as Request, res as Response);

            const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
            ,'email',testEmail,'password');

            //check password hasn't changed
            const match = await bcrypt.compare("OriginalPassword123!", data[0].password);
            t.truthy(match);

            t.true(res.status.calledWith(400))
            t.true(res.json.calledWith({mssg: "Old password doesn't match!"}));
        
      });

      test('changePassword with correct original password results in success', async (t: any) => {
      

        const req = mockRequest({
            email:testEmail, 
            oldPassword: "OriginalPassword123!",
            newPassword:"NewPassword123!"
        });
        const res = mockResponse();
        await changePassword(req as Request, res as Response);

        const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
        ,'email',testEmail,'password');

        //check password has changed
        const match = await bcrypt.compare("NewPassword123!", data[0].password);
        t.truthy(match);

        t.true(res.status.calledWith(200))
        t.true(res.json.calledWith({mssg: "New Password Set!"}));
    
  });



    
    



  
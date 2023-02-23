const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { loginUser } from '../controllers/userController';
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../utils/supabaseSetUp';
import { supabaseQueryClass } from '../utils/databaseInterface';
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
  
  test("Login with missing email", async (t: any) => {
            
           
    const req = mockRequest({password: "Password123"});
    const res = mockResponse();
            
            await loginUser(req as Request, res as Response)

            t.true(res.status.calledWith(400))
            t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
        });


    test("Login with missing password", async (t: any) => {

        const req = mockRequest({email:"testemail@gmail.com"});
        const res = mockResponse();
    
        await loginUser(req as Request, res as Response)
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
});

    test("Login with missing password and email", async (t: any) => {
    
       const req = mockRequest({});
       const res = mockResponse();
        
        await loginUser(req as Request, res as Response)
        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'All Fields Must Be Filled'}));
    });
    

    test("Login with non-existent email results in incorrect email message", async (t: any) => {

            
        const req = mockRequest({
            email: `${uuidv4()}@gmail.com`,
            password:`Password123`
        });
        const res = mockResponse();

        await loginUser(req as Request, res as Response)


        t.true(res.status.calledWith(400))
        t.true(res.json.calledWith({mssg: 'Incorrect Email'}));

    });


let randomEmail:string;

test.before(async (t : any) => {
    const uuid = uuidv4();
    randomEmail = `${uuid}@gmail.com`

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("CorrectPassword123!", salt);

    const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "firstName", lastName:"lastName", 
    email:randomEmail, password: hashedPassword});
    
    if(error){
        t.fail()
    }
})

test.after(async() => {
    await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
})

test("Login with existent email but wrong password", async (t: any) => {

    const req = mockRequest({
                            email: randomEmail,
                             password:`WrongPassword123!`});
    const res = mockResponse();

   
    await loginUser(req as Request, res as Response)

    t.true(res.status.calledWith(400))
    t.true(res.json.calledWith({mssg: "Incorrect Password"}));
});

test("Login with correct email and correct password", async (t : any) => {
    

    const req = mockRequest({
        email: randomEmail,
         password:`CorrectPassword123!`});
    const res = mockResponse();

    // await loginUser(req as Request, res as Response)
    
    
    // expect(resultJson.mssg).toEqual("Successful Login");
    // expect(resultJson.firstName).toEqual("firstName");
    // expect(resultJson.email).toEqual(randomEmail);

    await loginUser(req as Request, res as Response)

    t.true(res.status.calledWith(200))
    // t.true(res.json.calledWith({mssg: "Successful Login"}));
    // // expect(resultJson.mssg).toEqual("Succesful Login");

});


    
    


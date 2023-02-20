require('dotenv').config();
import server from '../../../server';
const request = require('supertest')
import { Request, Response } from 'express';
import { createToken, loginUser, signupUser } from '../../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
import { response } from 'express';
import { R } from 'chart.js/dist/chunks/helpers.core';
import { after } from 'node:test';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();
//test createJWToken, then verify with correct and incorrect secret
describe('testing createToken',() => {

    test('createToken results in legitimate token',() => {

         const uuid = uuidv4();
         const token = createToken(uuid);
         
         try{
            //if jwt doesn't verify, it throws an error
            const decodedToken = jwt.verify(token, process.env.JWTSECRET)
            expect(decodedToken.id).toBe(uuid); //token payload
         }
         catch(err){
            fail(err)
         }
    })

    test('createToken with incorrect secret results in illegitimate token ',() => {
        const uuid = uuidv4();
        const secret = uuidv4();
        const token = createToken(uuid, secret);
        
        expect(() => 
        {jwt.verify(token, process.env.JWTSECRET)}
        ).toThrow();
    })
})


//test login
//test with no email
//test with no password
//test with no password and no email
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    mockResponse = {
        status : jest.fn().mockImplementation((result) => {
            resultStatus = result;
            return mockResponse;
        }),
        json: jest.fn().mockImplementation((result) => {
            resultJson = result;
            return mockResponse;
        })

    }
    //Holds the json from the server
    let resultJson = {
        firstName: null,
            email: null,
            mssg: null,
    };
    //holds the response status of the server
    let resultStatus = {};


    afterEach(() => 
    {server.close()})

	beforeEach( () => {

		resultJson = {
            firstName: null,
            email: null,
            mssg: null,
        };
		resultStatus = {};
        
	});

describe("test login backend", () => {

    describe("Login with missing fields", () => {
        test("Login with missing email", async () => {

            mockRequest = {
                body:{password:"Password123"}

            };
            
            await loginUser(mockRequest as Request, mockResponse as Response)
            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "All Fields Must Be Filled"});
        });

        test("Login with missing password", async () => {
        
            mockRequest = {
                body:{email:"testemail@gmail.com"}

            };
            
            await loginUser(mockRequest as Request, mockResponse as Response)
            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "All Fields Must Be Filled"});
        });

        test("Login with missing password and email", async () => {
        
            mockRequest = {
                body:{}

            };
            
            await loginUser(mockRequest as Request, mockResponse as Response)
            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "All Fields Must Be Filled"});
        });

        test("Login with missing password and email", async () => {
        
            mockRequest = {
                body:{}

            };
            
            await loginUser(mockRequest as Request, mockResponse as Response)
            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "All Fields Must Be Filled"});
        });
    })
        

    describe("Login with non-existent email", () => {

        test("non-existent email results in incorrect email message", async () => {

            mockRequest = {
                body:{
                    email: `${uuidv4()}@gmail.com`,
                    password:`Password123`
                }

            };

            await loginUser(mockRequest as Request, mockResponse as Response)

            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "Incorrect Email"});

        });
    })


    describe("Login Form with correct email but wrong and correct passwords", () => {

        let randomEmail:string;

        beforeAll(async () => {
            const uuid = uuidv4();
            randomEmail = `${uuid}@gmail.com`

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("CorrectPassword123!", salt);
    
            const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "firstName", lastName:"lastName", 
            email:randomEmail, password: hashedPassword});
            
            if(error){
                fail(error);
            }
        })
        afterAll(async() => {
            await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);

        })
        
        test("Login with existent email but wrong password", async () => {

            mockRequest = {
                body:{
                    email: randomEmail,
                    password:`WrongPassword123!`
                }

            };

            await loginUser(mockRequest as Request, mockResponse as Response)
            expect(resultStatus).toBe(400);
            // when the res.json is called we expect it to have the body json from the controller
            expect(resultJson).toEqual({mssg: "Incorrect Password"});
        });

        test("Login with correct email and correct password", async () => {
            
            mockRequest = {
                body:{
                    email: randomEmail,
                    password:"CorrectPassword123!"
                }

            };

            await loginUser(mockRequest as Request, mockResponse as Response)
            
            expect(resultStatus).toBe(200);
            expect(resultJson.mssg).toEqual("Successful Login");
            expect(resultJson.firstName).toEqual("firstName");
            expect(resultJson.email).toEqual(randomEmail);
            // expect(resultJson.mssg).toEqual("Succesful Login");

        });
        


    })
})



//test signup
//test with no email/password/age/firstName/lastName
//test with bad emails
//test with bad names (eg. numbers)
//test with bad passwords
//test with already existing email
//test with correct details

describe("test sign up backend", () => {

    describe("sign up with missing fields", () => {
        test("sign up with no email", async () => {
            mockRequest.body = {
                firstName: "John",
                lastName: "Doe",
                password: "CorrectPassword123",
                age: 0
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no password", async () => {
            mockRequest.body = {
                firstName: "John",
                lastName: "Doe",
                email:"johndoe@gmail.com",
                age: 0
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })

        test("sign up with no lastName", async () => {
            mockRequest.body = {
                firstName: "John",
                email:"johndoe@gmail.com",
                password: "CorrectPassword123",
                age: 0
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no firstName", async () => {
            mockRequest.body = {
                email:"johndoe@gmail.com",
                lastName: "Doe",
                password: "CorrectPassword123",
                age: 0
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no age", async () => {
            mockRequest.body = {
                firstName: "John",
                lastName: "Doe",
                password: "CorrectPassword123",
                email:"johndoe@gmail.com",
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })

    })
        

})

//get user
//test with existing user in db
//test with non-existent user in db
//test with non-existent user in db

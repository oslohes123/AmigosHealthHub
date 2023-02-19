import server from '../../server';
const request = require('supertest')
import { Request, Response } from 'express';
import { createToken, loginUser, signupUser } from '../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
// import { beforeEach } from 'node:test';
require('dotenv').config();

import supabase from '../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../utils/databaseInterface';
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
describe("Test Login form", () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    let resultJson = {};
    let resultStatus = {};

    beforeEach( () => {

        mockRequest = {};
        mockResponse = {};

        resultJson = {};
        resultStatus = {};

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
        
    });
        describe("login form with missing fields", () => {
            
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
        });


        //test with email that doesn't exist in database
        //test with correct email, but wrong password
        //test with correct email, but correct password
        // describe("Login form with incorrect credentials", () => {


        //     test("Login with non-existent email", async () => {
            
        //         mockRequest = {
        //             body:{
        //                 email: `${uuidv4()}@gmail.com`,
        //                 password:`Password123`
        //             }
            
        //         };
                
        //         await loginUser(mockRequest as Request, mockResponse as Response)
                
        //         expect(resultStatus).toBe(400);
        //         // when the res.json is called we expect it to have the body json from the controller
        //         expect(resultJson).toEqual({mssg: "Incorrect Email"});
                
        //     });
        // })


//         describe("Login Form with correct email but wrong and correct passwords", () => {

//             let randomEmail:string;

//             beforeAll(async () => {
//                 const uuid = uuidv4();
//                 randomEmail = `${uuid}@gmail.com`
//                 try{
//                 await supabaseQuery.insert(supabase, 'Users',{firstName: "TEST", lastName:"TEST", 
//                 email:randomEmail, password:"CorrectPassword123!" });
//                 }
//                 catch(error){
//                     fail(error);
//                 }
//                 // if(error){
//                 //     fail(error);
//                 // }
//             })

//         //     afterAll(async() => {
//         //         await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
              
//         //     })
            
//         //     test("Login with existent email but wrong password", async () => {

//         //         mockRequest = {
//         //             body:{
//         //                 email: randomEmail,
//         //                 password:`WrongPassword123!`
//         //             }
            
//         //         };
                
//         //         await loginUser(mockRequest as Request, mockResponse as Response)
//         //         expect(resultStatus).toBe(400);
//         //         // when the res.json is called we expect it to have the body json from the controller
//         //         expect(resultJson).toEqual({mssg: "Incorrect Password"});
//         //     });


//         // })
            

        
})


//test signup
//test with no email/password/age/firstName/lastName
//test with bad emails
//test with bad names (eg. numbers)
//test with bad passwords
//test with already existing email
//test with correct details



//get user
//test with existing user in db
//test with non-existent user in db
//test with non-existent user in db

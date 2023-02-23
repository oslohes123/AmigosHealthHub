// require('dotenv').config();
// import server from '../../../server';
// const request = require('supertest')
// import { Request, Response } from 'express';
// // import { createToken, getInfo, loginUser, signupUser} from '../controllers/userController';
// import { signupUser, getInfo } from '../../../controllers/userController';
// const jwt = require('jsonwebtoken');
// import {v4 as uuidv4} from 'uuid';
// import { response } from 'express';
// import { R } from 'chart.js/dist/chunks/helpers.core';
// import { after, before } from 'node:test';
// const bcrypt = require('bcrypt');
// import supabase from '../../../utils/supabaseSetUp';
// import { supabaseQueryClass } from '../../../utils/databaseInterface';
// const supabaseQuery = new supabaseQueryClass();
// //test createJWToken, then verify with correct and incorrect secret

// // let mockRequest: Partial<Request>;
// // let mockResponse: Partial<Response>;

// // mockResponse = {
// //     status : jest.fn().mockImplementation((result) => {
// //         resultStatus = result;
// //         return mockResponse;
// //     }),
// //     json: jest.fn().mockImplementation((result) => {
// //         resultJson = result;
// //         return mockResponse;
// //     })

// // }
// // //Holds the json from the server
// // let resultJson = {
// //     firstName: null,
// //         email: null,
// //         mssg: null,
// // };
// // //holds the response status of the server
// // let resultStatus = {};



// // afterEach(() => 
// // {server.close()})

// // beforeEach( () => {

// //     resultJson = {
// //         firstName: null,
// //         email: null,
// //         mssg: null,
// //     };
// //     resultStatus = {};
    
// // });
// // //test signup
// //test with no email/password/age/firstName/lastName
// //test with bad emails
// //test with bad names (eg. numbers)
// //test with bad passwords
// //test with already existing email
// //test with correct details

// describe("test sign up backend", () => {
//     let mockRequest: Partial<Request>;
// let mockResponse: Partial<Response>;

// mockResponse = {
//     status : jest.fn().mockImplementation((result: any) => {
//         resultStatus = result;
//         return mockResponse;
//     }),
//     json: jest.fn().mockImplementation((result : any) => {
//         resultJson = result;
//         return mockResponse;
//     })

// }
// //Holds the json from the server
// let resultJson = {
//     firstName: null,
//         email: null,
//         mssg: null,
// };
// //holds the response status of the server
// let resultStatus = {};



// afterEach(() => 
// {server.close()})

// beforeEach( () => {

//     resultJson = {
//         firstName: null,
//         email: null,
//         mssg: null,
//     };
//     resultStatus = {};
//     mockRequest = {};
    
// });
// //test 
//     describe("sign up with missing fields", () => {
        // test("sign up with no email", async () => {
        //     mockRequest = {
        //         body:{
        //         firstName: "John",
        //         lastName: "Doe",
        //         password: "CorrectPassword123!",
        //         age: 0
        //         }
        //     }

        //     await signupUser(mockRequest as Request, mockResponse as Response);
        //     expect(resultStatus).toEqual(400)
        //     expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        // })
//         test("sign up with no password", async () => {
//             mockRequest = {
//                 body:{
//                 firstName: "John",
//                 lastName: "Doe",
//                 email:"johndoe@gmail.com",
//                 age: 0
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
//         })

//         test("sign up with no lastName", async () => {
//             mockRequest = {
//                 body:{
//                 firstName: "John",
//                 email:"johndoe@gmail.com",
//                 password: "CorrectPassword123!",
//                 age: 0
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
//         })
//         test("sign up with no firstName", async () => {
//             mockRequest = {
//                 body:{
//                 email:"johndoe@gmail.com",
//                 lastName: "Doe",
//                 password: "CorrectPassword123!",
//                 age: 0
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
//         })
//         test("sign up with no age", async () => {
//             mockRequest = {
//                 body:{
//                 firstName: "John",
//                 lastName: "Doe",
//                 password: "CorrectPassword123!",
//                 email:"johndoe@gmail.com",
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
//         })

//     })
        
//     describe("test sign up with unacceptable inputs", () => {


//         test("sign up with invalid email", async() => {
//             mockRequest = {
//                 body:{
//                     firstName: "John",
//                     lastName: "Doe",
//                     password: "CorrectPassword123!",
//                     email:"johndoegmail.com",
//                     age:30
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"Invalid Email"})
//         })

        
//         test("sign up with name containing numbers", async() => {
//             mockRequest = {
//                 body:{
//                     firstName: "John123",
//                     lastName: "Doe123",
//                     password: "CorrectPassword123!",
//                     email:"johndoe@gmail.com",
//                     age:30
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"First name and last name must only contains letters a-z or A-Z"})
//         })

//         test("sign up with a not secure password", async() => {
//             mockRequest = {
//                 body:{
//                     firstName: "John",
//                     lastName: "Doe",
//                     password: "insecurePassword123",
//                     email:"johndoe@gmail.com",
//                     age:30
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400)
//             expect(resultJson).toEqual({mssg:"Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"})
//         })
//     })


//     describe("sign up and get info with correct fields", () => {
//         let randomEmail:string;
//         let hashedPassword: string
//         beforeAll(async () => {
//             const uuid = uuidv4();
//             randomEmail = `${uuid}@gmail.com`
    
//             const salt = await bcrypt.genSalt(10);
//             hashedPassword = await bcrypt.hash("CorrectPassword123!", salt);
    
//             const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "firstName", lastName:"lastName", 
//             email:randomEmail, password: hashedPassword});
            
//             if(error){
//                 fail(error);
//             }
//         })
//         afterEach(async() => {
//             await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
    
//         })
//         test("sign up with already existing email", async () => {
//             mockRequest = {
//                 body:{
//                     firstName: "John",
//                     lastName: "Doe",
//                     password: hashedPassword,
//                     email: randomEmail,
//                     age:30
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(400);
//             expect(resultJson).toEqual({mssg: "User already exists!"});

//         })
//         test("successful sign up with correct details", async () => {
//             mockRequest = {
//                 body:{
//                     firstName: "John",
//                     lastName: "Doe",
//                     password: hashedPassword,
//                     email: randomEmail,
//                     age:30
//                 }
//             }

//             await signupUser(mockRequest as Request, mockResponse as Response);
//             expect(resultStatus).toEqual(200);
//             expect(resultJson.mssg).toEqual("Successful sign up!");
//             expect(resultJson.email).toEqual(randomEmail);
//             expect(resultJson.firstName).toEqual("John");
//         })
//     })


//         describe("getInfo backend", () => {
            
//             const uuid = uuidv4();
//             let randomEmail = `${uuid}@gmail.com`
//             test("getInfo with missing fields", async() => {
//                 mockRequest = {
//                     headers: {}
//                 }
        
//                 await getInfo(mockRequest as Request, mockResponse as Response);
//                 expect(resultStatus).toEqual(400);
//                 expect(resultJson).toEqual({ mssg: 'Email must be provided' })
//             })

//             test("getInfo with non-existent user", async() => {
            
//                 mockRequest = {
//                     headers: {
//                         email: randomEmail,
//                     }
//                 }
        
//                 await getInfo(mockRequest as Request, mockResponse as Response);
//                 expect(resultStatus).toEqual(400);
//                 expect(resultJson).toEqual({ mssg: 'User not found!' })
//             })


//         })






//     describe("getInfo with correct fields", () => {
//         const uuid = uuidv4();
//         let randomEmail = `${uuid}@gmail.com`
//         beforeAll(async () => {
//             const {data, error}:any = await supabaseQuery.insert(supabase, 'User',{firstName: "firstName", lastName:"lastName", 
//             email:randomEmail, password: "CorrectPassword123!"});
            
//             if(error){
//                 fail(error);
//             }
//         })

//         afterAll(async () => {
//             await supabaseQuery.deleteFrom(supabase, 'User', 'email', randomEmail);
//         })
//         test("getInfo with correct fields", async() => {
//             mockRequest = {
//                 headers: {
//                     email: randomEmail,
//                 }
//             }
//             // let resultJson = {
//             //     user:{
//             //         email: null,
//             //     }
//             // }

//             await getInfo(mockRequest as Request, mockResponse as Response);
//             console.log(JSON.stringify(resultJson));
//             expect(resultStatus).toEqual(200);
//             //@ts-ignore
//             expect(resultJson.user.email).toEqual(randomEmail)

//         })
//     })


  

// })

// //get user
// //test with existing user in db
// //test with non-existent user in db
// //test with non-existent user in db
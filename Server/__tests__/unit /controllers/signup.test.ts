require('dotenv').config();
import server from '../../../server';
const request = require('supertest')
import { Request, Response } from 'express';
import { createToken, loginUser, signupUser } from '../../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
import { response } from 'express';
import { R } from 'chart.js/dist/chunks/helpers.core';
import { after, before } from 'node:test';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();
//test createJWToken, then verify with correct and incorrect secret

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
            mockRequest = {
                body:{
                firstName: "John",
                lastName: "Doe",
                password: "CorrectPassword123!",
                age: 0
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no password", async () => {
            mockRequest = {
                body:{
                firstName: "John",
                lastName: "Doe",
                email:"johndoe@gmail.com",
                age: 0
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })

        test("sign up with no lastName", async () => {
            mockRequest = {
                body:{
                firstName: "John",
                email:"johndoe@gmail.com",
                password: "CorrectPassword123!",
                age: 0
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no firstName", async () => {
            mockRequest = {
                body:{
                email:"johndoe@gmail.com",
                lastName: "Doe",
                password: "CorrectPassword123!",
                age: 0
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })
        test("sign up with no age", async () => {
            mockRequest = {
                body:{
                firstName: "John",
                lastName: "Doe",
                password: "CorrectPassword123!",
                email:"johndoe@gmail.com",
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"All Fields Must Be Filled"})
        })

    })
        
    describe("test sign up with unacceptable inputs", () => {


        test("sign up with invalid email", async() => {
            mockRequest = {
                body:{
                    firstName: "John",
                    lastName: "Doe",
                    password: "CorrectPassword123!",
                    email:"johndoegmail.com",
                    age:30
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"Invalid Email"})
        })

        
        test("sign up with name containing numbers", async() => {
            mockRequest = {
                body:{
                    firstName: "John123",
                    lastName: "Doe123",
                    password: "CorrectPassword123!",
                    email:"johndoe@gmail.com",
                    age:30
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"First name and last name must only contains letters a-z or A-Z"})
        })

        test("sign up with a not secure password", async() => {
            mockRequest = {
                body:{
                    firstName: "John",
                    lastName: "Doe",
                    password: "insecurePassword123",
                    email:"johndoe@gmail.com",
                    age:30
                }
            }

            await signupUser(mockRequest as Request, mockResponse as Response);
            expect(resultStatus).toEqual(400)
            expect(resultJson).toEqual({mssg:"Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"})
        })
    })
})

//get user
//test with existing user in db
//test with non-existent user in db
//test with non-existent user in db

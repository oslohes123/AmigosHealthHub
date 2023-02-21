require('dotenv').config();
import server from '../../../server';
// const request = require('supertest')
import { Request, Response } from 'express';
import {getInfo} from '../../../controllers/userController';
// const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
// import { response } from 'express';
// import { R } from 'chart.js/dist/chunks/helpers.core';
// import { after } from 'node:test';
const bcrypt = require('bcrypt');
import supabase from '../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();
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
test("passing test", ()=>{
    expect(5).toEqual(5);
})

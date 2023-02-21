require('dotenv').config();
// import server from '../../../server';
// const request = require('supertest')
// import { Request, Response } from 'express';
import { createToken} from '../../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
// import { response } from 'express';
// import { R } from 'chart.js/dist/chunks/helpers.core';
// import { after, before } from 'node:test';
// const bcrypt = require('bcrypt');
// import supabase from '../../../utils/supabaseSetUp';
// import { supabaseQueryClass } from '../../../utils/databaseInterface';
// const supabaseQuery = new supabaseQueryClass();
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

import app from '../../index'
const request = require('supertest')
import { createJWToken } from '../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';
require('dotenv').config();

test('test',() => {
    expect(3).toBe(3)
})

//test createJWToken, then verify with correct and incorrect secret
describe('testing createToken',() => {

    test('with correct secret',() => {

         const uuid = uuidv4();
         const token = createJWToken(uuid);
         
         try{
            const decodedToken = jwt.verify(token, process.env.JWTSECRET)
            expect(decodedToken.id).toBe(uuid);
         }
         catch(err){
            fail(err)
         }
    })

    test('with wrong secret',() => {
        const uuid = uuidv4();
        const secret = uuidv4();
        const token = createJWToken(uuid, secret);
        
        expect(() => 
        {jwt.verify(token, process.env.JWTSECRET)}
        ).toThrow();
    })
})


//test login
//test with no email
//test with no password
//test with no password and no email
//test with email that doesn't exist in database
//test with correct email, but wrong password
//test with correct email, but correct password
//test with wrong email, but correct password




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
require('dotenv').config();
const test = require('ava');
import { createToken } from '../../../controllers/userController';
const jwt = require('jsonwebtoken');
import {v4 as uuidv4} from 'uuid';

test('createToken results in legitimate token',(t: any) => {

    const uuid = uuidv4();
    const token = createToken(uuid); //default second param is correct secret in .env
    
    try{
       //if jwt doesn't verify, it throws an error
       const decodedToken = jwt.verify(token, process.env.JWTSECRET)
       t.true(decodedToken.id == uuid); //token payload
    }
    catch(err){
       t.fail('JWT did not verify')
    }
})

test('createToken with incorrect secret results in illegitimate token ',(t: any) => {
   const uuid = uuidv4();
   const secret = uuidv4();
   const token = createToken(uuid, secret);
   
   t.throws(() => {
    jwt.verify(token, process.env.JWTSECRET)
   })

})
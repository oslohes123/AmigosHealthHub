const jwtToken = require('jsonwebtoken');
const dotenv = require("dotenv");
import{Request, Response, NextFunction} from 'express'
dotenv.config();

import supabase from '../utils/supabaseSetUp';
import { supabaseQueryClass } from '../utils/databaseInterface';
const supabaseQuery = new supabaseQueryClass();

/**
 * Middleware that checks that every request has an authenticated user
 * 
 * - Extract jwtToken from authorization header in the request, and if the jwtToken is verified, pass on 
 * the request. 
 */

export const checkToken = async(req:Request, res:Response,next:NextFunction) => {

   console.log("Middleware Executed!")
//Check user making request is authenticated
 const {authorization} = req.headers
//  console.log(req.headers)
 //NO authorisation header
 if(!authorization){    
    return res.status(401).json({mssg: "No Authorization Header"})
 }
 console.log(`authorization: ${authorization}`)
 console.log(`authorization.indexOf(' '): ${authorization.indexOf(' ')}`)
 console.log(`authorization.includes("bearer"): ${authorization.includes("bearer")}`)

 if((authorization.indexOf(' ') === -1)  || (!authorization.includes("bearer"))){
   return res.status(400).json({mssg: "Authorization header must have format 'bearer token'."})
 }
 
 else{
   //Extract token from bearer token
   const token = authorization.split(' ')[1];
   console.log(`token: ${token}`);

   try{
      console.log(`In checkToken, ${JSON.stringify(jwtToken.verify(token, process.env.JWTSECRET))}`)
      const {id} =  jwtToken.verify(token, process.env.JWTSECRET);

     const {data, error}: any =  await supabaseQuery.selectWhere(supabase, 'User','id', id, 'id');

      if(data.length === 0){
         return res.status(401).json({mssg:"Request Failed due to Authentication"})
      }
      else{
         console.log("IN NEXT LN50")
      next();
      }
   }
   catch(error){
      console.error(`Error caught by me, ${error}`);
      return res.status(401).json({mssg:"Request Failed due to Authentication"})
   }
}
}

export {};
// module.exports = checkToken;
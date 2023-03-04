const jwtToken = require('jsonwebtoken');
const dotenv = require("dotenv");
import{Request, Response, NextFunction} from 'express'
dotenv.config();
import { getUserByID } from '../utils/userFunctions';

export const checkTokenHelper = async(req:Request, res:Response,next:NextFunction|null) => {
   console.log(`request in checkTokenHelpers: ${req}`);
    const {authorization} = req.headers
   
    if(!authorization){    
       return res.status(401).json({mssg: "No Authorization Header"})
    }
   
    if((authorization.indexOf(' ') === -1)  || (!authorization.includes("bearer"))){
      return res.status(401).json({mssg: "Authorization header must have format 'bearer token'."})
    }
    
    else{
         //Extract token from bearer token
         const token = authorization.split(' ')[1];
         console.log(`token: ${token}`);
   
         try{
            const {id} =  jwtToken.verify(token, process.env.JWTSECRET);
            const {data, error}: any = await getUserByID(id,'id')
            if(data.length === 0){
               console.log("Request Failed due to Authentication");
               return res.status(401).json({
               mssg:"Request Failed due to Authentication"
            })}
            
            if(next){
               console.log("next is being called")
                next()
            }
            else{
                return res.status(200).json({mssg:"Legitimate token"}) 
            }
         }
         catch(error){
            console.error(`Error caught by me, ${error}`);
            return res.status(401).json({mssg:"Request Failed due to Authentication"})
         }
      }
   }
   
   
   export {};
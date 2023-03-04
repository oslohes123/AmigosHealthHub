const dotenv = require("dotenv");
import{Request, Response, NextFunction} from 'express'
dotenv.config();
import { checkTokenHelper } from '../utils/checkTokenHelpers';

/**
 * Middleware that checks that every request has an authenticated user
 * - Extract jwtToken from authorization header in the request, and if the jwtToken is verified, pass on 
 * the request. 
 */

export const checkToken = async(req:Request, res:Response,next:NextFunction) => {
   return checkTokenHelper(req, res, next)
}

export {};
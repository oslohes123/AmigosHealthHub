const dotenv = require("dotenv");
import{Request, Response} from 'express'
dotenv.config();
import { checkTokenHelper } from '../utils/checkTokenHelpers';

export const checkInitialToken = async(req:Request, res:Response) => {
   console.log(`checkInitialToken executed!`)
   return checkTokenHelper(req, res, null);
}
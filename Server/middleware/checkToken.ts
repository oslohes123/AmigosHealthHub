import { type Request, type Response, type NextFunction } from 'express'
import { checkTokenHelper } from '../utils/checkTokenHelpers'
const dotenv = require('dotenv')
dotenv.config()

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkTokenHelper(req, res, next)
}

export {}

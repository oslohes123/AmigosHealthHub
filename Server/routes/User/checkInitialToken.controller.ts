import { type Request, type Response } from 'express'
import { checkTokenHelper } from '../../utils/checkTokenHelpers'
const dotenv = require('dotenv')
dotenv.config()

export const checkInitialToken = async (req: Request, res: Response) => {
  console.log('checkInitialToken executed!')
  return await checkTokenHelper(req, res, null)
}

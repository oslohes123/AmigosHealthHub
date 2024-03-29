import { type Request, type Response } from 'express'
import { checkTokenHelper } from '../../utils/General/checkTokenHelpers'
const dotenv = require('dotenv')
dotenv.config()

export const checkInitialToken = async (req: Request, res: Response) => {
  return await checkTokenHelper(req, res, null)
}

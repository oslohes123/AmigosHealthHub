import { type Request, type Response, type NextFunction } from 'express'
import { getUserByID } from '../User/userFunctions'
const jwtToken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

export const checkTokenHelper = async (req: Request, res: Response, next: NextFunction | null) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mssg: 'No Authorization Header' })
  }

  if ((!authorization.includes(' ')) || (!authorization.includes('bearer'))) {
    return res.status(401).json({ mssg: "Authorization header must have format 'bearer token'." })
  } else {
    // Extract token from bearer token
    const token = authorization.split(' ')[1]
    try {
      const { id } = jwtToken.verify(token, process.env.JWTSECRET)
      const { data, error }: any = await getUserByID(id, 'id')
      if (error) {
        return res.status(400).json({ mssg: 'Something went wrong', error })
      }
      if (data.length === 0) {
        return res.status(401).json({
          mssg: 'Request Failed due to Authentication'
        })
      }

      if (next) {
        next()
      } else {
        return res.status(200).json({ mssg: 'Legitimate token' })
      }
    } catch (error) {
      return res.status(401).json({ mssg: 'Request Failed due to Authentication' })
    }
  }
}

export {}

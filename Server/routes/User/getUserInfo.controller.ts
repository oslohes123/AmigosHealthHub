import { getUserByEmail } from '../../utils/User/userFunctions'
import { type Request, type Response } from 'express'

export const getInfo = async (req: Request, res: Response) => {
  const { email } = req.headers

  if (!email) return res.status(400).json({ mssg: 'Email must be provided' })

  const { data, error }: any = await getUserByEmail(email, 'firstName, lastName, email, age')

  if (error) return res.status(400).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })

  else if (data.length === 0) return res.status(400).json({ mssg: 'User not found!' })

  else return res.status(200).json({ user: data[0] })
}

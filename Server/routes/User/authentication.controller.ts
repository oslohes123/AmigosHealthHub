import { type Request, type Response } from 'express'
import { createUser, getUserByEmail, verifyPassword, createHashedPassword, createToken } from '../../utils/userFunctions'
import { isEmail, isAlpha, isStrongPassword, isInt } from '../../utils/validators'
import { type UserInterface } from '../../utils/userInterface'
import { createCalorieGoal } from '../../utils/Food/userCaloriesInit'

import RouteNamesClass from '../../utils/routeNamesClass'
require('dotenv').config()
const routeName = new RouteNamesClass()
export const loginUser = async (req: Request, res: Response) => {
  console.log(`routeName.fullFaceGraphURL:${routeName.fullFaceGraphURL} `)
  console.log(`routeName.fullWordCloudURL:${routeName.fullWordCloudURL} `)
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      mssg: 'All Fields Must Be Filled'
    })
  }

  const { data, error } = await getUserByEmail(email)

  if (error) {
    return res.status(400).json({
      mssg: 'Something went wrong.', dev: JSON.stringify(error)
    })
  }

  if (data.length === 0) {
    return res.status(400).json({
      mssg: 'Incorrect Email'
    })
  }

  const passwordMatches = await verifyPassword(password, data[0].password)
  const id = data[0].id
  if (passwordMatches) {
    return res.status(200).json({
      firstName: data[0].firstName,
      email: data[0].email,
      token: createToken(id),
      id,
      mssg: 'Successful Login'
    })
  } else {
    return res.status(400).json({
      mssg: 'Incorrect Password'
    })
  }
}

export const signupUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, age } = req.body
  let { calories } = req.body
  if (!email || !password || !firstName || !lastName || !age) {
    return res.status(400).json({
      mssg: 'All Fields Must Be Filled'
    })
  }

  if (!calories) {
    calories = 2000
  } else {
    if (!(isInt(calories) && calories > 0)) {
      return res.status(400).json({
        mssg: 'Invalid Calorie Format'
      })
    }
  }
  if (!isEmail(email)) {
    return res.status(400).json({
      mssg: 'Invalid Email'
    })
  }

  if (!(isAlpha(firstName) && isAlpha(lastName))) {
    return res.status(400).json({
      mssg: 'First name and last name must only contains letters a-z or A-Z'
    })
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      mssg: 'Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol'
    })
  }

  const { data, error }: any = await getUserByEmail(req.body.email)

  if (error) {
    return res.status(400).json({
      mssg: 'Sorry, something went wrong!',
      err: error.message
    })
  } else {
    if (data.length === 1) {
      return res.status(400).json({
        mssg: 'User already exists!'
      })
    } else {
      let hashedPassword: string

      try {
        hashedPassword = await createHashedPassword(password)
      } catch (error: any) {
        return res.status(400).json({ mssg: 'Sorry, something went wrong!', err: error.message })
      }

      const user: UserInterface = { firstName, lastName, email, password: hashedPassword, age }
      const { data, error } = await createUser(user)

      if (error) return res.status(400).json({ mssg: 'Sorry, something went wrong!', err: error.message })
      else {
        const id = data[0].id
        const token = createToken(id)

        const { error } = await createCalorieGoal(id, calories)
        if (error) return res.status(400).json({ mssg: 'Sorry, something went wrong!', err: error })

        return res.status(200).json({ firstName, email, token, id, mssg: 'Successful sign up!' })
      }
    }
  }
}

export {}

import { type Request, type Response } from 'express'
import { createHashedPassword, getUserByID, getUserByEmail, updateUser, verifyPassword, deleteUserRowByID } from '../../utils/User/userFunctions'
import { isEmail, isStrongPassword } from '../../utils/General/validators'
import { deleteAllWorkoutPlansWithExercises } from '../../utils/Exercise/deleteWorkoutPlans'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
import { schemaForRequireduserid } from '../../utils/JSONSchemas/schemaForRequireduserid'
require('dotenv').config()

export const changeStats = async (req: Request, res: Response) => {
  const { firstName, lastName, prevEmail, newEmail, age } = req.body

  if (!firstName || !lastName || !newEmail || !age) {
    return res.status(400).json({ mssg: 'All Fields Must Be Filled' })
  }

  if (prevEmail !== newEmail) {
    if (!isEmail(newEmail)) return res.status(400).json({ mssg: 'Invalid New Email' })

    // Check that new email is available
    const { data, error }: any = await getUserByEmail(newEmail)

    if (error) return res.status(500).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })

    if (data.length === 0) {
      const { error }: any = await updateUser(prevEmail, {
        firstName,
        lastName,
        email: newEmail,
        age
      })

      if (error) {
        return res.status(500).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })
      }
      return res.status(200).json({ mssg: 'Successful New Email' })
    }

    if (data.length > 0) {
      return res.status(400).json({ mssg: 'Email Already Exists' })
    }
  }

  // As new email == previous email, update the other fields
  else {
    const { error }: any = await updateUser(prevEmail, { firstName, lastName, age })
    if (error) {
      return res.status(500).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })
    }
    return res.status(200).json({ mssg: 'Successful Update' })
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({
      mssg: 'All Fields Must Be Filled'
    })
  }

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({
      mssg: 'Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol'
    })
  }

  const { data, error }: any = await getUserByEmail(email)

  if (error) {
    return res.status(500).json({ mssg: 'Something went wrong.', dev: JSON.stringify(error) })
  }
  if (data.length > 0) {
    const passwordMatches = await verifyPassword(oldPassword, data[0].password)

    if (!passwordMatches) return res.status(400).json({ mssg: "Old password doesn't match!" })

    else {
      const hashedPassword = await createHashedPassword(newPassword)

      const { error }: any = await updateUser(email, { password: hashedPassword })

      if (error) return res.status(500).json({ mssg: 'Sorry, something went wrong', err: error.message })

      return res.status(200).json({ mssg: 'New Password Set!' })
    }
  } else return res.status(400).json({ mssg: "Email doesn't exist in our database" })
}

/**
 * Implementation needs to change to delete this user from all tables(cascade delete)
 */

export const deleteAccount = async (req: Request, res: Response) => {
  const { userid, password } = req.body
  if (!validateJSONSchema(req.body, schemaForRequireduserid)) {
    return res.status(400).json({ mssg: 'Something went wrong', dev: 'JSON instance does not follow the JSON schema' })
  }
  if (!userid || !password) {
    return res.status(400).json({ mssg: 'Id or Password are empty!' })
  }

  const { data, error }: any = await getUserByID(userid)

  if (error) {
    res.status(400).json({ error })
  }
  if (data.length < 1) {
    res.status(400).json({ mssg: 'Incorrect Email!' })
  } else {
    // email is present in database, check if email & password are correct
    const match = await verifyPassword(password, data[0].password)
    if (match) {
      const { errorPresent } = await deleteAllWorkoutPlansWithExercises(userid)
      if (errorPresent) {
        return res.status(400).json({ mssg: 'Failed to delete account!', errorPresent })
      }
      const { error }: any = await deleteUserRowByID(userid)
      if (error) {
        return res.status(400).json({ mssg: 'Failed to delete account!', error })
      } else {
        return res.status(200).json({ mssg: 'Account Deleted!' })
      }
    } else {
      return res.status(400).json({ mssg: 'Incorrect Password' })
    }
  }
}

export {}

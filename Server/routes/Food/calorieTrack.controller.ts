import { type Request, type Response } from 'express'
import { SupabaseQueryClass } from '../../utils/databaseInterface'
import supabase from '../../utils/supabaseSetUp'
import validateJSONSchema from './../../utils/validateJSONSchema'
import * as calorieSchemas from '../../utils/JSONSchemas/Food/calorieSchemas'
require('dotenv').config()
const databaseQuery = new SupabaseQueryClass()

export const insertCalorieGoal = async (req: Request, res: Response) => {
  const { UserID, CalorieGoal, Date } = req.body

  if (!validateJSONSchema(req.body, calorieSchemas.insertCalorieGoal)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: calorieSchemas.insertCalorieGoal })
  }

  const { data, error }: any = await databaseQuery.insert(
    supabase,
    'Calories',
    {
      UserID,
      Date,
      CalorieGoal
    }
  )
  if (error) {
    if (error.code === '22P02') {
      return res.status(400).send({ message: 'Invalid input syntax for UUID', details: error.message })
    }
    return res.status(500).send(error)
  } else {
    return res.status(200).send(data)
  }
}

export const readSpecificCalorieGoal = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!validateJSONSchema(req.params, calorieSchemas.readSpecificCalorieGoals)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.params, schema: calorieSchemas.readSpecificCalorieGoals })
  }

  const { data, error }: any = await databaseQuery.match(
    supabase,
    'Calories',
    '*',
    {
      id
    }
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(data)
  }
}

export const readAllCalorieGoals = async (req: Request, res: Response) => {
  const { UserID } = req.params
  if (!validateJSONSchema(req.params, calorieSchemas.readAllCalorieGoals)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.params, schema: calorieSchemas.readAllCalorieGoals })
  }

  const { data, error }: any = await databaseQuery.match(
    supabase,
    'Calories',
    '*',
    {
      UserID
    }
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(data)
  }
}

export const updateSpecificCalorieGoal = async (req: Request, res: Response) => {
  const { CalorieGoal, id } = req.body
  if (!validateJSONSchema(req.body, calorieSchemas.updateCalorieGoal)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: calorieSchemas.updateCalorieGoal })
  }
  const { data, error }: any = await databaseQuery.update(
    supabase,
    'Calories',
    {
      CalorieGoal
    },
    'id',
    id
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(data)
  }
}

export const deleteSpecificCalorieGoal = async (req: Request, res: Response) => {
  const { id } = req.body
  if (!validateJSONSchema(req.body, calorieSchemas.deleteSpecificCalorieGoal)) {
    return res.status(400).json({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: calorieSchemas.deleteSpecificCalorieGoal })
  }
  const { data, error }: any = await databaseQuery.deleteFrom(
    supabase,
    'Calories',
    'id',
    id
  )
  if (error) {
    return res.status(500).json(error)
  } else {
    return res.status(200).json(data)
  }
}

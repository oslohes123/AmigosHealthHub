import { type Request, type Response } from 'express'
import { SupabaseQueryClass } from '../../utils/General/databaseInterface'
import supabase from '../../utils/General/supabaseSetUp'
import type FoodInput from './../../interfaces/Food/foodInterfaces'
import validateJSONSchema from '../../utils/JSONSchemas/validateJSONSchema'
import * as foodSchemas from '../../utils/JSONSchemas/Food/foodDatabaseSchemas'
require('dotenv').config()
const databaseQuery = new SupabaseQueryClass()

/**
 * Add tracked food for a user
 * @param req
 * @param res
 * @returns Error or success message
 */
export const addTrackedFood = async (req: Request, res: Response) => {
  const Data: FoodInput = req.body
  if (!validateJSONSchema(req.body, foodSchemas.addTrackedFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: foodSchemas.addTrackedFood })
  }
  // First match to see if the food is already in the Food table
  const { data: matchingData, error: matchingDataError }: any = await databaseQuery.match(
    supabase,
    'Food',
    'FoodID',
    { FoodID: Data.input.foodIdentifier }
  )
  if (matchingDataError) {
    return res.status(500).send(matchingDataError)
  } else {
    // If the food is not in the Food table, insert it
    if (matchingData[0] === undefined) {
      const { error: insertFoodError }: any = await databaseQuery.insert(
        supabase,
        'Food',
        {
          FoodID: Data.input.foodIdentifier,
          Name: Data.input.foodData.food_name,
          Calories: Data.input.foodData.calories,
          Protein: Data.input.foodData.protein,
          Sugar: Data.input.foodData.sugar,
          Fiber: Data.input.foodData.fiber,
          BrandName: Data.input.foodData.brand_name,
          Fat: Data.input.foodData.fat,
          Carbohydrate: Data.input.foodData.carbohydrates,
          AltMeasures: Data.input.foodData.alt_measures || [{ measure: Data.input.foodData.serving_unit }]
        }
      )
      if (insertFoodError) {
        return res.status(500).send(insertFoodError)
      }
    }
  }

  const { data: returnData, error }: any = await databaseQuery.insert(
    supabase,
    'Tracked Food',
    {
      UserID: Data.userID,
      Date: new Date().toISOString().split('T')[0],
      FoodName: Data.input.foodData.food_name,
      BrandName: Data.input.foodData.brand_name,
      Quantity: Data.input.foodData.serving_qty,
      Measure: Data.input.foodData.serving_unit,
      CaloriesInMeal: Data.input.foodData.calories * Data.input.foodData.serving_qty,
      FoodID: Data.input.foodIdentifier
    }
  )
  if (error) {
    return res.status(500).send(error)
  }
  return res.status(200).send(returnData)
}

/**
 * Get a tracked food for a user
 * @param req
 * @param res
 * @returns Error or success message
 */
export const getTrackedFood = async (req: Request, res: Response) => {
  const { date, userID } = req.params
  if (!validateJSONSchema(req.params, foodSchemas.getTrackedFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.params, schema: foodSchemas.getTrackedFood })
  }
  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Tracked Food',
    '*',
    { UserID: userID, Date: date }
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(returnData)
  }
}

/**
 * get specific tracked food for a user
 * @param req
 * @param res
 * @returns Error or success message
 */
export const getSpecificTrackedFood = async (req: Request, res: Response) => {
  const { LogID } = req.params
  if (!validateJSONSchema(req.params, foodSchemas.getSpecificTrackedFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.params, schema: foodSchemas.getSpecificTrackedFood })
  }
  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Tracked Food',
    '*',
    { LogID }
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(returnData)
  }
}

/**
 * update a specific tracked food for a user
 * @param req
 * @param res
 * @returns Error or success message
 */
export const updateTrackedFood = async (req: Request, res: Response) => {
  const { Quantity, Measure, LogID, Calories } = req.body
  if (!validateJSONSchema(req.body, foodSchemas.updateTrackedFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: foodSchemas.updateTrackedFood })
  }

  const { data: returnData, error }: any = await databaseQuery.update(
    supabase,
    'Tracked Food',
    { Quantity, Measure, CaloriesInMeal: Quantity * Calories },
    'LogID',
    LogID
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(returnData)
  }
}

/**
 * Delete a tracked food for a user
 * @param req
 * @param res
 * @returns Error or success message
 */
export const deleteTrackedFood = async (req: Request, res: Response) => {
  const { LogID } = req.body
  if (!validateJSONSchema(req.body, foodSchemas.deleteTrackedFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: foodSchemas.deleteTrackedFood })
  }

  const { data: returnData, error }: any = await databaseQuery.deleteFrom(
    supabase,
    'Tracked Food',
    'LogID',
    LogID
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(returnData)
  }
}

/**
 * Get a food from the database
 * @param req
 * @param res
 * @returns Error or success message
 */
export const getFood = async (req: Request, res: Response) => {
  const { FoodID } = req.params
  if (!validateJSONSchema(req.params, foodSchemas.getFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.params, schema: foodSchemas.getFood })
  }

  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Food',
    '*',
    { FoodID }
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(returnData)
  }
}

/**
 * Get multiple foods from the database using their FoodIDs
 * @param req
 * @param res
 * @returns Error or success message
 */
export const getMultipleFood = async (req: Request, res: Response) => {
  const { foodIDs } = req.body
  if (!validateJSONSchema(req.body, foodSchemas.getMultipleFood)) {
    return res.status(400).send({ mssg: 'Invalid JSON Schema', whatWeGot: req.body, schema: foodSchemas.getMultipleFood })
  }

  const { data, error }: any = await databaseQuery.selectIn(
    supabase,
    'Food',
    '*',
    'FoodID',
    foodIDs
  )
  if (error) {
    return res.status(500).send(error)
  } else {
    return res.status(200).send(data)
  }
}

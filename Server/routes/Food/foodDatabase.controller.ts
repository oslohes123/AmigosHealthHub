import { type Request, type Response } from 'express'
import { supabaseQueryClass as SupabaseQueryClass } from '../../utils/databaseInterface'
import supabase from '../../utils/supabaseSetUp'
import type FoodInput from './../../interfaces/Food/foodInterfaces'
require('dotenv').config()
const databaseQuery = new SupabaseQueryClass()

export const addTrackedFood = async (req: Request, res: Response) => {
  const Data: FoodInput = req.body
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

export const getTrackedFood = async (req: Request, res: Response) => {
  const { date, userID } = req.params
  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Tracked Food',
    '*',
    { UserID: userID, Date: date }
  )
  if (error) {
    console.log('Error getting tracked food')
    res.status(500).send(error)
  } else {
    res.status(200).send(returnData)
  }
}

export const getSpecificTrackedFood = async (req: Request, res: Response) => {
  const { logID } = req.params
  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Tracked Food',
    '*',
    { LogID: logID }
  )
  if (error) {
    console.log('Error getting specific tracked food')
    res.status(500).send(error)
  } else {
    res.status(200).send(returnData)
  }
}

export const updateTrackedFood = async (req: Request, res: Response) => {
  const { Quantity, Measure, LogID, Calories } = req.body
  console.log(req.body)
  console.log(Quantity, Measure, LogID)

  const { data: returnData, error }: any = await databaseQuery.update(
    supabase,
    'Tracked Food',
    { Quantity, Measure, CaloriesInMeal: Quantity * Calories },
    'LogID',
    LogID
  )
  if (error) {
    console.log('Error updating tracked food')
    res.status(500).send(error)
  } else {
    res.status(200).send(returnData)
  }
}

export const deleteTrackedFood = async (req: Request, res: Response) => {
  const { logID: LogID } = req.body
  const { data: returnData, error }: any = await databaseQuery.deleteFrom(
    supabase,
    'Tracked Food',
    'LogID',
    LogID
  )
  if (error) {
    console.log('Error deleting tracked food')
    res.status(500).send(error)
  } else {
    res.status(200).send(returnData)
  }
}

export const getFood = async (req: Request, res: Response) => {
  const { FoodID } = req.params
  const { data: returnData, error }: any = await databaseQuery.match(
    supabase,
    'Food',
    '*',
    { FoodID }
  )
  if (error) {
    console.log('Error getting food')
    res.status(500).send(error)
  } else {
    res.status(200).send(returnData)
  }
}

export const getMultipleFood = async (req: Request, res: Response) => {
  const { foodIDs } = req.body

  const { data, error }: any = await databaseQuery.selectIn(
    supabase,
    'Food',
    '*',
    'FoodID',
    foodIDs
  )
  if (error) {
    console.log('Error getting food')
    res.status(500).send(error)
  } else {
    res.status(200).send(data)
  }
}

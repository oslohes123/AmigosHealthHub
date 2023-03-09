require("dotenv").config();
import { Request, Response } from "express";
import { supabaseQueryClass } from "../../utils/databaseInterface";
import supabase from "../../utils/supabaseSetUp";
import FoodInput from './../../interfaces/Food/foodInterfaces';
const databaseQuery = new supabaseQueryClass();



export const foodUpdate = async (req: Request, res: Response) => {

    const Data: FoodInput = req.body;
    let foodID;
    // First match to see if the food is already in the Food table
    const { data: matchingData, error: matchingDataError }: any = await databaseQuery.match(
        supabase,
        "Food",
        "FoodID",
        { "FoodID": Data.input.foodIdentifier }
    );
    if (matchingDataError) {
        return res.status(500).send(matchingDataError);
    } else {
        // If the food is not in the Food table, insert it
        if (matchingData[0] == undefined) {
            const { data: insertFoodData, error: insertFoodError }: any = await databaseQuery.insert(
                supabase,
                "Food",
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
                }
            );
            if (insertFoodError) {
                return res.status(500).send(insertFoodError)
            }
        } 
    }

    const { data: returnData, error }: any = await databaseQuery.insert(
        supabase,
        "Tracked Food",
        {
            UserID: Data.userID,
            Date: new Date().toISOString().split('T')[0],
            FoodName: Data.input.foodData.food_name,
            BrandName: Data.input.foodData.brand_name,
            Quantity: Data.input.foodData.serving_qty,
            Measure: Data.input.foodData.serving_unit,
            CaloriesInMeal:Data.input.foodData.calories * Data.input.foodData.serving_qty,
            FoodID: Data.input.foodIdentifier,
        }
    );
    if (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send(returnData);
};


export const getTrackedFood = async (req: Request, res: Response) => {
    let date = req.params.date;
    let userID = req.params.userID;
    const { data: returnData, error }: any = await databaseQuery.match(
        supabase,
        "Tracked Food",
        "*",
        { "UserID":userID, "Date":date }
    );
    if (error) {
        console.log("Error getting tracked food");
        res.status(500).send(error);
    } else {
        res.status(200).send(returnData);
    }
}

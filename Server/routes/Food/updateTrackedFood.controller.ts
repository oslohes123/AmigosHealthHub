require("dotenv").config();
import { Request, Response } from "express";
import { supabaseQueryClass } from "../../utils/databaseInterface";
import supabase from "../../utils/supabaseSetUp";
const databaseQuery = new supabaseQueryClass();

interface FoodData {
    food_name: string;
    brand_name: string;
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: number;
    calories: number;
    fat: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    fiber: number;
    alt_measures: null | unknown;
}

interface FoodInput {
    input: {
        foodData: FoodData;
        foodIdentifier: string;
    };
    userID: string;
}

export const foodUpdate = async (req: Request, res: Response) => {
    // const inputFoodData = req.body.foodDetails;
    const Data: FoodInput = req.body;
    let foodID;
    const { data: matchingData, error: matchingDataError }: any = await databaseQuery.match(
        supabase,
        "Food",
        "FoodID",
        { "FoodIdentifier": Data.input.foodIdentifier }
    );
    if (matchingDataError) {
        return res.status(500).send(matchingDataError);
    } else {
        if (matchingData[0] == undefined) {
            const { data: insertFoodData, error: insertFoodError }: any = await databaseQuery.insert(
                supabase,
                "Food",
                {
                    Name: Data.input.foodData.food_name,
                    Calories: Data.input.foodData.calories,
                    FoodIdentifier: Data.input.foodIdentifier,
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
            } else {
                foodID = insertFoodData[0].FoodID;
            }
        } else {
            foodID = matchingData[0].FoodID;
        }


    }

    const { data: returnData, error }: any = await databaseQuery.insert(
        supabase,
        "Tracked Food",
        {
            UserID: Data.userID,
            FoodName: Data.input.foodData.food_name,
            BrandName: Data.input.foodData.brand_name,
            Quantity: Data.input.foodData.serving_qty,
            Measure: Data.input.foodData.serving_unit,
            FoodIdentifier: Data.input.foodIdentifier,
            CaloriesInMeal:Data.input.foodData.calories * Data.input.foodData.serving_qty,
            FoodID: foodID,
        }
    );
    if (error) {
        return res.status(500).send(error);
    }
    return res.status(200).send(returnData);
};

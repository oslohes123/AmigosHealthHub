require("dotenv").config();
import e, { Request, Response } from "express";
import { supabaseQueryClass } from "../../utils/databaseInterface";
import supabase from "../../utils/supabaseSetUp";
const databaseQuery = new supabaseQueryClass();


export const insertCalorieGoal = async (req: Request, res: Response) => {
    const {UserID,CalorieGoal,Date} = req.body;
    const { data, error }: any = await databaseQuery.insert(
        supabase,
        "Calories",
        {
            UserID: UserID,
            Date: Date,
            CalorieGoal: CalorieGoal,   
        }
    );
    if (error) {
        console.log("Error: ", error);
        return res.status(500).send(error);
    }else{
        return res.status(200).send(data);
    }
}

export const readSpecificCalorieGoal = async (req: Request, res: Response) => {
    const {id} = req.params;
    const { data, error }: any = await databaseQuery.match(
        supabase,
        "Calories",
        "*",
        {
            id: id,
        }
    );
    if (error) {
        console.log("Error: ", error);
        return res.status(500).send(error);
    }else{
        return res.status(200).send(data);
    }
}

export const readAllCalorieGoals = async (req: Request, res: Response) => {
    const {UserID} = req.params;
    const { data, error }: any = await databaseQuery.match(
        supabase,
        "Calories",
        "*",
        {
            UserID: UserID,
        }
    );
    if (error) {
        console.log("Error: ", error);
        return res.status(500).send(error);
    }else{
        return res.status(200).send(data);
    }
}


export const updateSpecificCalorieGoal = async (req: Request, res: Response) => {
    const {CalorieGoal,id} = req.body;
    const {data, error}: any = await databaseQuery.update(
        supabase,
        "Calories",
        {
            CalorieGoal: CalorieGoal,
        },
        "id",
        id
    );
    if (error) {
        console.log("Error: ", error);
        return res.status(500).send(error);
    }else{
        return res.status(200).send(data);
    }
}

export const deleteSpecificCalorieGoal = async (req: Request, res: Response) => {
    const {id} = req.body;
    const {data, error}: any = await databaseQuery.deleteFrom(
        supabase,
        "Calories",
        "id",
        id
    );
    if (error) {
        console.log("Error: ", error);
        return res.status(500).send(error);
    }else{
        return res.status(200).send(data);
    }
}




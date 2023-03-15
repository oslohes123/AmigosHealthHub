require("dotenv").config();
import { supabaseQueryClass } from "../../utils/databaseInterface";
import supabase from "../../utils/supabaseSetUp";
const databaseQuery = new supabaseQueryClass();

export const createCalorieGoal = async (UserID:string,CalorieGoal:number) => {
    const { data, error }: any = await databaseQuery.insert(
        supabase,
        "Calories",
        {
            UserID: UserID,
            Date: new Date().toISOString().split('T')[0],
            CalorieGoal: CalorieGoal,   
        }
    );
    if (error) {
        console.log("Error inserting");
        
        console.log("Error: ", error);
        return {error};
    }else{
        console.log("calorie goal inserted");
        return {data};
    }
}
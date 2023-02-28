import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "../constants";
import specificFoodNutritionInterface from '../interfaces/specificFoodNutritionInterface';
import genericSearchInterface from '../interfaces/genericSearchInterface';
import { baseUrl } from './../constants';
import axios from 'axios';


<<<<<<< HEAD

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseURL, anonKey)
=======
>>>>>>> main

const foodExtension = "/api/food/";

export async function genericSearch(value:string):Promise<genericSearchInterface> {
    console.log("URL: " + baseUrl + foodExtension + "0."+ value)
    const response = await fetch(
        baseUrl + foodExtension + "0."+ value,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data;

    

}








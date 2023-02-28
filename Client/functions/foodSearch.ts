import {createClient} from '@supabase/supabase-js'
import {anonKey, searchMethods, supabaseURL} from "../constants";
import specificFoodNutritionInterface from '../interfaces/specificFoodNutritionInterface';
import genericSearchInterface from '../interfaces/genericSearchInterface';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { number } from 'prop-types';

// For testing purposes
// Update this with your own UrlService
let ip_address:string = '192.168.0.14';
let port:string = '3001'


export async function genericSearch(value:string):Promise<genericSearchInterface | AxiosError> {
    let url:string = `http://${ip_address}:${port}/api/food/${searchMethods.genericSearch}.${value}`;

    let response:AxiosResponse;
    try {
        response = await axios.get(url);
    } catch (error: any | AxiosError) {
        if(axios.isAxiosError(error)){
            console.log(error.response);
        }else{
            console.log("Default error handler" + error);
        }
        return error;
    }
    return response.data;
}

export async function specificSearch(value:string):Promise<specificFoodNutritionInterface | AxiosError> {
    let url:string = `http://${ip_address}:${port}/api/food/${searchMethods.specificSearch}.${value}`;
    let response:AxiosResponse;
    try {
        response = await axios.get(url);
    }
    catch (error: any | AxiosError) {
        if(axios.isAxiosError(error)){
            console.log(error.response);
        }else{
            console.log("Default error handler" + error);
        }
        return error;
    }

    return response.data;
}







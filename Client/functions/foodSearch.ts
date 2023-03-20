import {createClient} from '@supabase/supabase-js'
import {anonKey, apiSearchMethods, clientSearchMethods, supabaseURL} from "../constants";
import specificFoodNutritionInterface from '../interfaces/specificFoodNutritionInterface';
import genericSearchInterface from '../interfaces/genericSearchInterface';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { number } from 'prop-types';
const portENV = process.env.PORT;
const ipAddressENV = process.env.IP_ADDRESS;
// For testing purposes
// Update this with your own UrlService
let ipAddress:string|undefined = ipAddressENV;
let port:string|undefined= portENV


export async function genericSearch(value:string):Promise<genericSearchInterface | AxiosError> {
    let url:string = `http://${ipAddress}:${port}/api/food/${clientSearchMethods.genericSearch}.${value}`;

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
    let url:string = `http://${ipAddress}:${port}/api/food/${clientSearchMethods.specificSearch}.${value}`;
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





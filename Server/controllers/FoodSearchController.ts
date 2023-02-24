require('dotenv').config()
import { Request, Response } from 'express';
import supabase from '../utils/supabaseSetUp'
import {SearchCriteria} from "../supabase/functions/FoodSearch/constants";


export const generalSearch = async(req:Request,res:Response) =>{
const {value,code}:SearchCriteria = req.params
    const {data, error} = await supabase.functions.invoke("FoodSearch", {
        body: {value:value,code:code},
    })
    if (!data || error) {
        console.log("An error has occurred "+ error?.error)
        return error;
    } else {
        return data;
    }
}

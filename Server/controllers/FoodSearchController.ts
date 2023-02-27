require('dotenv').config()
import { Request, Response } from 'express';
import { SearchCriteria, searchMethods } from "../constants";
import brandedSearch from "../searches/brandedSearch";
import instantSearch from "../searches/instantFoodSearch";
import nutrientSearch from "../searches/nutrientSearch";
import transformNutrientSearchInterface  from '../utils/parseNutritionSearch';
import transformBrandedSearchInterface from '../utils/parseBrandedSearch';
import transformInstantSearchInterface from '../utils/parseInstantSearch';
import genericSearchInterface from './../interfaces/genericSearchInterface';
import specificFoodNutritionInterface from './../interfaces/specificFoodNutritionInterface';


export const generalSearch = async(req:Request,res:Response) =>{
// const {value:inputData,code}:SearchCriteria = req.query.value
    const inputData = req.params.value
    const code = parseInt(req.params.code)
    let data;
    let result:genericSearchInterface | specificFoodNutritionInterface = {items:[]};

    switch (code) {
        case searchMethods.instantSearch:
            data = await instantSearch(inputData)
            result = transformInstantSearchInterface(data)
            break;
        case searchMethods.nutrientSearch:
            data = await nutrientSearch(inputData)
            result = transformNutrientSearchInterface(data)
            break;
        case searchMethods.brandedSearch:
            data = await brandedSearch(inputData)
            result = transformBrandedSearchInterface(data)
            break;
        default:
            data = `The code was incorrect as ${code} use literal searchMethods for correct code`
            result = {items:[], errorMessage: `Invalid code: ${code}. Use literal searchMethods for correct code.` };
    }

    console.log(result);
    
    res.json(result);
}


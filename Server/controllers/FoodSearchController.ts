require('dotenv').config()
import { Request, Response } from 'express';
import {SearchCriteria, searchMethods} from "../constants";
import brandedSearch from "../searches/brandedSearch";
import nutrientSearch from "../searches/nutrientSearch";
import instantSearch from "../searches/instantFoodSearch";


export const generalSearch = async(req:Request,res:Response) =>{
// const {value:inputData,code}:SearchCriteria = req.query.value
    const inputData = req.params.value
    const code = parseInt(req.params.code)
    let data;
    switch (code) {
        case searchMethods.instantSearch:
            data = await instantSearch(inputData)
            break;
        case searchMethods.nutrientSearch:
            data = await nutrientSearch(inputData)
            break;
        case searchMethods.brandedSearch:
            data = await brandedSearch(inputData)
            break;
        default:
            data = `The code was incorrect as ${code} use literal searchMethods for correct code`
    }

    res.json(data);
}



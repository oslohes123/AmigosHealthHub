const express = require('express');
const FoodSearchRouter = express.Router();
FoodSearchRouter.use(express.json());
import { checkToken,checkingTokens } from "../../middleware/checkToken";
import {generalSearch} from "./foodSearch.controller";
import routeNames from "../../utils/routeNamesClass";
let routeNamesClass = new routeNames();

if(checkingTokens){
    FoodSearchRouter.use(checkToken); //Routes are protected.
}

// FoodSearchRouter.use(checkToken); //Routes are protected.

// All these routes start with /api/food/

FoodSearchRouter.get(routeNamesClass.partialFoodSearchURL,generalSearch)


export default FoodSearchRouter;
export {};

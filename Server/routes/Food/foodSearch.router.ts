import { checkToken} from "../../middleware/checkToken";
import {generalSearch} from "./foodSearch.controller";
import routeNames from "../../utils/routeNamesClass";

const express = require('express');
const FoodSearchRouter = express.Router();
FoodSearchRouter.use(express.json());

let routeNamesClass = new routeNames();
FoodSearchRouter.use(checkToken); //Routes are protected.

// All these routes start with /api/food/
FoodSearchRouter.get(routeNamesClass.partialFoodSearchURL,generalSearch)

export default FoodSearchRouter;
export {};

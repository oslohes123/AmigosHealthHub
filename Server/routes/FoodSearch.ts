const express = require('express');
const FoodSearchRouter = express.Router();
FoodSearchRouter.use(express.json());
import{checkToken} from '../middleware/checkToken'
import {generalSearch} from "../controllers/FoodSearchController.ts";
FoodSearchRouter.use(checkToken); //Routes are protected.
/**
 * All these routes start with /api/user
 */
FoodSearchRouter.post('/foodsearch',generalSearch )


// module.exports = changeProfileDetailsRouter;
export default FoodSearchRouter;
export {};

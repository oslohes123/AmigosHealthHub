const express = require('express');
const FoodSearchRouter = express.Router();
FoodSearchRouter.use(express.json());
// import{checkToken} from '../middleware/checkToken'
import {generalSearch} from "./foodSearch.controller";

// FoodSearchRouter.use(checkToken); //Routes are protected.
/**
 * All these routes start with /edgefunctions/
 */
FoodSearchRouter.get('/:code.:value',generalSearch)


// module.exports = changeProfileDetailsRouter;
export default FoodSearchRouter;
export {};

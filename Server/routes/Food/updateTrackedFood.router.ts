const express = require('express');
const FoodUpdateRouter = express.Router();
FoodUpdateRouter.use(express.json());
import{checkToken} from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass';
import { foodUpdate } from './updateTrackedFood.controller';
let routeNames = new RouteNamesClass();

// FoodUpdateRouter.use(checkToken); //Routes are protected.

// This route goes to /api/food/updateTrackedFood
FoodUpdateRouter.post(routeNames.partialFoodUpdateURL, foodUpdate)

// module.exports = changeProfileDetailsRouter;
export default FoodUpdateRouter;
export {};
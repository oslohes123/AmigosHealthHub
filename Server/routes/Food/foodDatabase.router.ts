import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass';
import { addTrackedFood,getTrackedFood,updateTrackedFood } from './foodDatabase.controller';

const express = require('express');
const foodDatabaseRouter = express.Router();
foodDatabaseRouter.use(express.json());
let routeNames = new RouteNamesClass();

foodDatabaseRouter.use(checkToken); //Routes are protected.

// This route goes to /api/food/updateTrackedFood
foodDatabaseRouter.post(routeNames.partialFoodAddURL, addTrackedFood)

foodDatabaseRouter.get(routeNames.partialFoodDatabaseGetURL, getTrackedFood)

foodDatabaseRouter.post(routeNames.partialFoodUpdateURL, updateTrackedFood)

// module.exports = changeProfileDetailsRouter;
export default foodDatabaseRouter;
export { };

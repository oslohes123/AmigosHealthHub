import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass';
import { foodUpdate,getTrackedFood } from './foodDatabase.controller';

const express = require('express');
const foodDatabaseRouter = express.Router();
foodDatabaseRouter.use(express.json());
let routeNames = new RouteNamesClass();

foodDatabaseRouter.use(checkToken); //Routes are protected.

// This route goes to /api/food/updateTrackedFood
foodDatabaseRouter.post(routeNames.partialFoodUpdateURL, foodUpdate)

foodDatabaseRouter.get(routeNames.partialFoodDatabaseGetURL, getTrackedFood)

// module.exports = changeProfileDetailsRouter;
export default foodDatabaseRouter;
export { };

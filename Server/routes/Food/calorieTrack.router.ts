import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass';
import * as calorieFunctions from './calorieTrack.controller';


const express = require('express');
const calorieRouter = express.Router();
calorieRouter.use(express.json());
let routeNames = new RouteNamesClass();

calorieRouter.use(checkToken); //Routes are protected.

// This route goes to /api/food/
calorieRouter.post(routeNames.partialUpdateSpecificCaloriesURL,calorieFunctions.updateSpecificCalorieGoal )

calorieRouter.get(routeNames.partialReadSpecificCaloriesURL,calorieFunctions.readSpecificCalorieGoal)

calorieRouter.post(routeNames.partialCreateCalorieLogURL,calorieFunctions.insertCalorieGoal)

calorieRouter.post(routeNames.partialDeleteCalorieLogURL,calorieFunctions.deleteSpecificCalorieGoal)

calorieRouter.get(routeNames.partialReadCaloriesURL,calorieFunctions.readAllCalorieGoals)



// module.exports = changeProfileDetailsRouter;
export default calorieRouter;
export { };

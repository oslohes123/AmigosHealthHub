import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass'
import { addTrackedFood, getTrackedFood, updateTrackedFood, deleteTrackedFood, getFood, getSpecificTrackedFood, getMultipleFood } from './foodDatabase.controller'

const express = require('express')
const foodDatabaseRouter = express.Router()
foodDatabaseRouter.use(express.json())
const routeNames = new RouteNamesClass()

foodDatabaseRouter.use(checkToken) // Routes are protected.

// This route goes to /api/food/updateTrackedFood
foodDatabaseRouter.post(routeNames.partialAddTrackedFood, addTrackedFood)

foodDatabaseRouter.get(routeNames.partialGetTrackedFoodURL, getTrackedFood)

foodDatabaseRouter.get(routeNames.partialGetSpecificTrackedFoodURL, getSpecificTrackedFood)

foodDatabaseRouter.post(routeNames.partialUpdateFoodURL, updateTrackedFood)

foodDatabaseRouter.post(routeNames.partialDeleteTrackedFoodURL, deleteTrackedFood)

foodDatabaseRouter.get(routeNames.partialGetFoodURL, getFood)

foodDatabaseRouter.post(routeNames.partialGetMultipleFoodURL, getMultipleFood)

// module.exports = changeProfileDetailsRouter;
export default foodDatabaseRouter
export { }

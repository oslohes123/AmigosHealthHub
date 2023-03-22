import { getCaloriesToday } from './exerciseCalories.controller'
import RouteNamesClass from '../../utils/routeNamesClass'
import { checkToken } from '../../middleware/checkToken'
const express = require('express')
const exerciseCaloriesRouter = express.Router()
exerciseCaloriesRouter.use(checkToken)
exerciseCaloriesRouter.use(express.json())
const routeNames = new RouteNamesClass()
// Routes

exerciseCaloriesRouter.get(routeNames.partialGetCaloriesToday, getCaloriesToday)
export default exerciseCaloriesRouter
export {}

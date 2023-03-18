import { checkToken } from '../../middleware/checkToken'
import { generalSearch } from './foodSearch.controller'
import RouteNames from '../../utils/routeNamesClass'

const express = require('express')
const FoodSearchRouter = express.Router()
FoodSearchRouter.use(express.json())

const routeNamesClass = new RouteNames()
FoodSearchRouter.use(checkToken) // Routes are protected.

// All these routes start with /api/food/
FoodSearchRouter.get(routeNamesClass.partialFoodSearchURL, generalSearch)

export default FoodSearchRouter
export {}

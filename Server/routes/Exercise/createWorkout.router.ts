import { createWorkout, deleteWorkoutPlan } from './createWorkout.controller'
import RouteNamesClass from '../../utils/General/routeNamesClass'
import { checkToken } from '../../middleware/checkToken'
const express = require('express')
const createWorkoutRouter = express.Router()
createWorkoutRouter.use(express.json())
createWorkoutRouter.use(checkToken)
const routeNames = new RouteNamesClass()
// Routes
createWorkoutRouter.post(routeNames.partialAddWorkout, createWorkout)
createWorkoutRouter.delete(routeNames.partialDeleteWorkout, deleteWorkoutPlan)
export default createWorkoutRouter
export {}

import { createWorkout, deleteWorkoutPlan } from './createWorkout.controller'
import RouteNamesClass from '../../utils/routeNamesClass'
const express = require('express')
const createWorkoutRouter = express.Router()
createWorkoutRouter.use(express.json())
const routeNames = new RouteNamesClass()
// Routes
createWorkoutRouter.post(routeNames.partialAddWorkout, createWorkout)
createWorkoutRouter.delete(routeNames.partialDeleteWorkout, deleteWorkoutPlan)
export default createWorkoutRouter
export {}

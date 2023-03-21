import { getAllExercises, getExerciseHistory } from './exerciseHistory.controller'
import RouteNamesClass from '../../utils/routeNamesClass'
const express = require('express')
const exerciseHistoryRouter = express.Router()
exerciseHistoryRouter.use(express.json())
const routeNames = new RouteNamesClass()
// Routes
exerciseHistoryRouter.get(routeNames.partialGetExerciseHistory, getExerciseHistory)
exerciseHistoryRouter.get(routeNames.partialGetAllExercises, getAllExercises)
export default exerciseHistoryRouter
export {}

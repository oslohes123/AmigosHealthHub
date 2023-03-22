import { getExerciseByName, searchForExercise } from './addExercise.controller'
import RouteNamesClass from '../../utils/routeNamesClass'
import { checkToken } from '../../middleware/checkToken'
const express = require('express')
const exerciseRouter = express.Router()
exerciseRouter.use(express.json())
const routeNames = new RouteNamesClass()
exerciseRouter.use(checkToken)
exerciseRouter.get(routeNames.partialSearchExercise, searchForExercise)
exerciseRouter.get(routeNames.partialGetExercise, getExerciseByName)
export default exerciseRouter
export {}

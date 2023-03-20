// Configuration
import { wordValues, faceValues, todaysValue, dateValues } from './mhGetStats.controller'
import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/routeNamesClass'
const express = require('express')
const mentalHealthRouter = express.Router()
const routeNames = new RouteNamesClass()
mentalHealthRouter.use(checkToken)

mentalHealthRouter.get(routeNames.partialWordCloud, wordValues)
mentalHealthRouter.get(routeNames.partialFaceGraph, faceValues)
mentalHealthRouter.get(routeNames.partialTodaysWord, todaysValue)
mentalHealthRouter.get(routeNames.partialGetDates, dateValues)

export default mentalHealthRouter

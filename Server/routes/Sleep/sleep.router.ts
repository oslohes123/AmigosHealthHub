import { addSleep, getSleep } from './sleep.controller'

import RouteNamesClass from '../../utils/General/routeNamesClass'

import { checkToken } from '../../middleware/checkToken'

const express = require('express')
const sleepRouter = express.Router()
sleepRouter.use(express.json())
sleepRouter.use(checkToken)
const routeNames = new RouteNamesClass()
// Routes
sleepRouter.post(routeNames.partialAddSleepURL, addSleep)
sleepRouter.post(routeNames.partialGetSleepURL, getSleep)

export default sleepRouter

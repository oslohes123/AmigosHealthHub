import { getInfo } from './getUserInfo.controller'
import { checkToken } from '../../middleware/checkToken'
import RouteNamesClass from '../../utils/General/routeNamesClass'
const express = require('express')
const getUserInfoRouter = express.Router()
getUserInfoRouter.use(express.json())
getUserInfoRouter.use(checkToken)
const routeNames = new RouteNamesClass()
// Routes
getUserInfoRouter.get(routeNames.partialGetInfoURL, getInfo)

export default getUserInfoRouter

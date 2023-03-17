// Configuration
import { Request, Response } from "express";
import { wordValues, faceValues, todaysValue , dateValues} from "./mhGetStats.controller";
// import { checkToken } from "../../middleware/checkToken";
const express = require('express');
const mentalHealthRouter = express.Router();
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
// mentalHealthRouter.use(checkToken)

mentalHealthRouter.get(routeNames.partialWordCloud, wordValues)
mentalHealthRouter.get(routeNames.partialFaceGraph, faceValues)
mentalHealthRouter.get(routeNames.partialTodaysWord, todaysValue)
mentalHealthRouter.get(routeNames.partialGetDates, dateValues)
// mentalHealthRouter.get('/reviewday', reviewDay)


export default mentalHealthRouter;


// Configuration
import { Request, Response } from "express";
import { wordValues, faceValues } from "./mhGetStats.controller";
// import { checkToken } from "../../middleware/checkToken";
const express = require('express');
const mentalHealthRouter = express.Router();
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
// mentalHealthRouter.use(checkToken)

mentalHealthRouter.get(routeNames.partialWordCloud, wordValues)
mentalHealthRouter.get(routeNames.partialFaceGraph, faceValues)
// mentalHealthRouter.get('/reviewday', reviewDay)


export default mentalHealthRouter;


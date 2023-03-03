const express = require('express');
const checkInitialTokenRouter = express.Router();
checkInitialTokenRouter.use(express.json());
import { checkInitialToken } from "./checkInitialToken.controller";
import RouteNamesClass from "../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
/**
 * All these routes start with /api/user
 */
//Routes
checkInitialTokenRouter.get(routeNames.partialCheckInitialTokenURL, checkInitialToken);

export default checkInitialTokenRouter;

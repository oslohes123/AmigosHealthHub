const express = require('express');
const changeProfileDetailsRouter = express.Router();
changeProfileDetailsRouter.use(express.json());
// const userFunctions = require('../controllers/changeProfileDetails');
import { changeStats, changePassword, deleteAccount } from "./changeProfileDetails.controller";
import{checkToken} from '../../middleware/checkToken'
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
changeProfileDetailsRouter.use(checkToken); //Routes are protected. 
/**
 * All these routes start with /api/user
 */
changeProfileDetailsRouter.post(routeNames.partialChangeStatsURL, changeStats)

changeProfileDetailsRouter.post(routeNames.partialChangePasswordURL, changePassword)

changeProfileDetailsRouter.post(routeNames.partialDeleteAccountURL, deleteAccount)


// module.exports = changeProfileDetailsRouter;
export default changeProfileDetailsRouter;
export {};
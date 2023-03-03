const express = require('express');
const changeProfileDetailsRouter = express.Router();
changeProfileDetailsRouter.use(express.json());
// const userFunctions = require('../controllers/changeProfileDetails');
import { changeStats, changePassword, deleteAccount } from "./changeProfileDetails.controller";
import{checkToken} from '../middleware/checkToken'
import RouteNames from "../utils/routeNames";
 const routeNames = new RouteNames();
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
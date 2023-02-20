const express = require('express');
const changeProfileDetailsRouter = express.Router();
changeProfileDetailsRouter.use(express.json());
// const userFunctions = require('../controllers/changeProfileDetails');
import { changeStats, changePassword, deleteAccount } from "../controllers/changeProfileDetails";
import{checkToken} from '../middleware/checkToken'

changeProfileDetailsRouter.use(checkToken); //Routes are protected. 
/**
 * All these routes start with /api/user
 */
changeProfileDetailsRouter.post('/changeProfileDetails/stats', changeStats)

changeProfileDetailsRouter.post('/changeProfileDetails/password', changePassword)

changeProfileDetailsRouter.post('/deleteAccount', deleteAccount)


// module.exports = changeProfileDetailsRouter;
export default changeProfileDetailsRouter;
export {};
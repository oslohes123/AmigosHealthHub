//Configuration
// import { Request, Response } from 'express';
const express = require('express');
const userInfoRouter = express.Router();
userInfoRouter.use(express.json());
const userFunctions = require('../controllers/getInfoController');
import { getInfo } from "../controllers/getInfoController";
import { checkToken } from "../middleware/checkToken";
userInfoRouter.use(checkToken);
/**
 * All these routes start with /api/user
 */

//Routes
userInfoRouter.get('/getInfo', getInfo);

export default userInfoRouter;
// module.exports = userInfoRouter;

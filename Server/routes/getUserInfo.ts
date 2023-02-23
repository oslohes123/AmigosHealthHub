//Configuration
// import { Request, Response } from 'express';
const express = require('express');
const getUserInfoRouter = express.Router();
getUserInfoRouter.use(express.json());
import { getInfo } from "../controllers/userController";
import { checkToken } from "../middleware/checkToken";
getUserInfoRouter.use(checkToken);
/**
 * All these routes start with /api/user
 */

//Routes
getUserInfoRouter.get('/getInfo', getInfo);

export default getUserInfoRouter;


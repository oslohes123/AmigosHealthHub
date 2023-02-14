//Configuration
// import { Request, Response } from 'express';
const express = require('express');
const userInfoRouter = express.Router();
userInfoRouter.use(express.json());
const userFunctions = require('../controllers/getInfoController');

const checkToken = require('../middleware/checkToken');
userInfoRouter.use(checkToken);
/**
 * All these routes start with /api/user
 */

//Routes
userInfoRouter.post('/getInfo', userFunctions.getInfo);

module.exports = userInfoRouter;

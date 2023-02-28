//Configuration
// import { Request ,Response } from "express";
const express = require('express');
const authRouter = express.Router();
authRouter.use(express.json());
// const userFunctions = require('../dist/controllers/changeProfileDetails')
// const userFunctions = require('../controllers/changeProfileDetails')
import {loginUser, signupUser} from './authentication.controller'
//Routes
/**
 * All these routes start with /api/user
 */

authRouter.post('/login', loginUser);

authRouter.post('/sign_up', signupUser);
// authRouter.get('/getInfo', getInfo);
export default authRouter;
export {}
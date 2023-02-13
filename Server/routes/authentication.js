//Configuration
// import { Request ,Response } from "express";
const express = require('express');
const authRouter = express.Router();
authRouter.use(express.json());
const userFunctions = require('../controllers/userController')

//Routes
/**
 * All these routes start with /api/user
 */

authRouter.post('/login', userFunctions.loginUser);

authRouter.post('/sign_up', userFunctions.signupUser);

module.exports = authRouter;
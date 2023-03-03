//Configuration
// import { Request, Response } from 'express';
const express = require('express');
const getUserInfoRouter = express.Router();
getUserInfoRouter.use(express.json());
import { getInfo } from "./getUserInfo.controller";
import { checkToken } from "../middleware/checkToken";
getUserInfoRouter.use(checkToken);
import RouteNames from "../utils/routeNames";
const routeNames = new RouteNames();
//Routes
getUserInfoRouter.get(routeNames.partialGetInfoURL, getInfo);

export default getUserInfoRouter;


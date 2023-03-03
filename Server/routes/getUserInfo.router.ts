//Configuration
// import { Request, Response } from 'express';
const express = require('express');
const getUserInfoRouter = express.Router();
getUserInfoRouter.use(express.json());
import { getInfo } from "./getUserInfo.controller";
import { checkToken } from "../middleware/checkToken";
getUserInfoRouter.use(checkToken);
import RouteNamesClass from "../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
getUserInfoRouter.get(routeNames.partialGetInfoURL, getInfo);

export default getUserInfoRouter;


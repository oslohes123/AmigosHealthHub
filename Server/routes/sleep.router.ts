const express = require('express');
const sleepRouter = express.Router();
sleepRouter.use(express.json());

import RouteNamesClass from '../utils/routeNamesClass';
import { addSleep } from './sleep.controller';
import { checkToken } from '../middleware/checkToken';
sleepRouter.use(checkToken);
const routeNames = new RouteNamesClass();
//Routes
sleepRouter.get(routeNames.partialAddSleepURL, addSleep);

export default sleepRouter;

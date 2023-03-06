const express = require('express');
const sleepRouter = express.Router();
sleepRouter.use(express.json());

import RouteNamesClass from '../utils/routeNamesClass';
import { checkToken } from '../middleware/checkToken';
import { sleep } from './sleep.controller';
sleepRouter.use(checkToken);
const routeNames = new RouteNamesClass();
//Routes
sleepRouter.get(routeNames.partialSleepURL, sleep);

export default sleepRouter;

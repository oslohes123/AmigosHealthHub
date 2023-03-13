const express = require('express');
const sleepRouter = express.Router();
sleepRouter.use(express.json());

import { addSleep, getSleep } from './sleep.controller';

import RouteNamesClass from '../../utils/routeNamesClass';

// import { checkToken } from '../../middleware/checkToken';
// sleepRouter.use(checkToken);
const routeNames = new RouteNamesClass();
//Routes
sleepRouter.post(routeNames.partialAddSleepURL, addSleep);
sleepRouter.post(routeNames.partialGetSleepURL, getSleep);

export default sleepRouter;

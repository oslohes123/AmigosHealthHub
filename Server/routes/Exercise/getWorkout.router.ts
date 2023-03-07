const express = require('express');
const getWorkoutRouter = express.Router();
getWorkoutRouter.use(express.json());
import { getWorkout } from "./getWorkout.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
getWorkoutRouter.get(routeNames.partialGetWorkout, getWorkout);
export default getWorkoutRouter;
export {}
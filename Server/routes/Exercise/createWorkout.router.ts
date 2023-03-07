const express = require('express');
const createWorkoutRouter = express.Router();
createWorkoutRouter.use(express.json());
import { createWorkout } from "./createWorkout.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
createWorkoutRouter.get(routeNames.partialAddWorkout, createWorkout);
export default createWorkoutRouter;
export {}
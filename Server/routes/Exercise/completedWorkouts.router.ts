const express = require('express');
const completedWorkoutsRouter = express.Router();
completedWorkoutsRouter.use(express.json());
import { getCompletedWorkouts } from "./completedWorkouts.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
completedWorkoutsRouter.get(routeNames.partialgetCompletedWorkouts, getCompletedWorkouts);
export default completedWorkoutsRouter;
export {}
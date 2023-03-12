const express = require('express');
const completedWorkoutsRouter = express.Router();
completedWorkoutsRouter.use(express.json());
import { addCompletedWorkouts, getAllCompletedWorkouts, getACompletedWorkout } from "./completedWorkouts.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
completedWorkoutsRouter.post(routeNames.partialaddCompletedWorkouts, addCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialGetAllCompletedWorkouts, getAllCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialgetCompletedWorkouts, getACompletedWorkout);
export default completedWorkoutsRouter;
export {}
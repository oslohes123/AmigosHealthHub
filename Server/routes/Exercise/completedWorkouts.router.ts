const express = require('express');
const completedWorkoutsRouter = express.Router();
completedWorkoutsRouter.use(express.json());
import { addCompletedWorkouts, getAllCompletedWorkouts, getACompletedWorkout, deleteTrackedWorkout } from "./completedWorkouts.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
completedWorkoutsRouter.post(routeNames.partialaddCompletedWorkout, addCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialGetAllCompletedWorkout, getAllCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialgetCompletedWorkout, getACompletedWorkout);
completedWorkoutsRouter.delete(routeNames.partialDeleteCompletedWorkout, deleteTrackedWorkout);
export default completedWorkoutsRouter;
export {}
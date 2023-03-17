const express = require('express');
const completedWorkoutsRouter = express.Router();
completedWorkoutsRouter.use(express.json());
import { addCompletedWorkouts, getAllCompletedWorkouts, getACompletedWorkout, deleteTrackedWorkout, getWorkoutFrequency, getActualExerciseNameFrequency, getActualExerciseTypeFrequency, getWorkoutHistoryByDate } from "./completedWorkouts.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
completedWorkoutsRouter.post(routeNames.partialaddCompletedWorkout, addCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialGetAllCompletedWorkout, getAllCompletedWorkouts);
completedWorkoutsRouter.get(routeNames.partialgetCompletedWorkout, getACompletedWorkout);
completedWorkoutsRouter.delete(routeNames.partialDeleteCompletedWorkout, deleteTrackedWorkout);
completedWorkoutsRouter.get(routeNames.partialGetWorkoutFrequency, getWorkoutFrequency);
completedWorkoutsRouter.get(routeNames.partialGetExerciseNameFrequency, getActualExerciseNameFrequency);
completedWorkoutsRouter.get(routeNames.partialGetExerciseTypeFrequency, getActualExerciseTypeFrequency);
completedWorkoutsRouter.get(routeNames.partialGetWorkoutHistoryByDate, getWorkoutHistoryByDate);
export default completedWorkoutsRouter;
export {}
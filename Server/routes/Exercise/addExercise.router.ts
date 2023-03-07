const express = require('express');
const addExerciseRouter = express.Router();
addExerciseRouter.use(express.json());
import { addExerciseToExercises, searchForExercise } from "./addExercise.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
addExerciseRouter.get(routeNames.partialSearchExercise, searchForExercise);
addExerciseRouter.post(routeNames.partialAddToExercises, addExerciseToExercises)
export default addExerciseRouter;
export {}
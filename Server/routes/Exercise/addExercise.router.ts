const express = require('express');
const exerciseRouter = express.Router();
exerciseRouter.use(express.json());
import { addExerciseToExercises, getExerciseByName, searchForExercise } from "./addExercise.controller";
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
exerciseRouter.get(routeNames.partialSearchExercise, searchForExercise);
exerciseRouter.post(routeNames.partialAddToExercises, addExerciseToExercises)
exerciseRouter.get(routeNames.partialGetExercise, getExerciseByName);
export default exerciseRouter;
export {}
import { addCompletedWorkouts, getAllCompletedWorkouts, getACompletedWorkout, deleteTrackedWorkout, getWorkoutFrequency, getActualExerciseNameFrequency, getActualExerciseTypeFrequency, getWorkoutHistoryByDate, getLastTrackedWorkout } from './completedWorkouts.controller'
import RouteNamesClass from '../../utils/General/routeNamesClass'
import { checkToken } from '../../middleware/checkToken'
const express = require('express')
const completedWorkoutsRouter = express.Router()
completedWorkoutsRouter.use(express.json())
const routeNames = new RouteNamesClass()
completedWorkoutsRouter.use(checkToken)
// Routes
completedWorkoutsRouter.post(routeNames.partialaddCompletedWorkout, addCompletedWorkouts)
completedWorkoutsRouter.get(routeNames.partialGetAllCompletedWorkout, getAllCompletedWorkouts)
completedWorkoutsRouter.get(routeNames.partialgetCompletedWorkout, getACompletedWorkout)
completedWorkoutsRouter.delete(routeNames.partialDeleteCompletedWorkout, deleteTrackedWorkout)
completedWorkoutsRouter.get(routeNames.partialGetWorkoutFrequency, getWorkoutFrequency)
completedWorkoutsRouter.get(routeNames.partialGetExerciseNameFrequency, getActualExerciseNameFrequency)
completedWorkoutsRouter.get(routeNames.partialGetExerciseTypeFrequency, getActualExerciseTypeFrequency)
completedWorkoutsRouter.get(routeNames.partialGetWorkoutHistoryByDate, getWorkoutHistoryByDate)
completedWorkoutsRouter.get(routeNames.partialLastTrackedWorkout, getLastTrackedWorkout)
export default completedWorkoutsRouter
export {}

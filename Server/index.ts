/** ---------------- Routes Start--------------- */
// HomePage Route
// app.get('/', (req, res) => {
//     res.send('Homepage');
// });

// Authentication Routes
// const authRouter = require('./routes/authentication')

import authRouter from './routes/User/authentication.router'

// Sleep Routes
import sleepRouter from './routes/Sleep/sleep.router'

import mentalHealthRouter from './routes/MentalHealth/getMentalHealthStats.router'

// Change Profile Details Routes
import changeProfileDetailsRouter from './routes/User/changeProfileDetails.router'

import foodDatabaseRouter from './routes/Food/foodDatabase.router'

import calorieTrackRouter from './routes/Food/calorieTrack.router'
// Mental Health Routes
import rateMentalRouter from './routes/MentalHealth/rateMental.router'

import FoodSearchRouter from './routes/Food/foodSearch.router'

// Get User Details Routes
import getUserInfoRouter from './routes/User/getUserInfo.router'

// Check initial token Route
import checkInitialTokenRouter from './routes/User/checkInitialToken.router'
import RouteNamesClass from './utils/routeNamesClass'
import exerciseHistoryRouter from './routes/Exercise/exerciseHistory.router'
import exerciseRouter from './routes/Exercise/addExercise.router'
// exerciseCalories Routes
import exerciseCaloriesRouter from './routes/Exercise/exerciseCalories.router'
// Workout Routes
import createWorkoutRouter from './routes/Exercise/createWorkout.router'
import getWorkoutRouter from './routes/Exercise/getWorkout.router'
import completedWorkoutsRouter from './routes/Exercise/completedWorkouts.router'
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const routeNames = new RouteNamesClass()

const port = process.env.PORT
if (port === undefined) {
  console.log('Please set the PORT environment variable.')
}
app.use(routeNames.exerciseBaseURL, exerciseRouter)
app.use(routeNames.exerciseBaseURL, exerciseHistoryRouter)
app.use(routeNames.caloriesBaseURL, exerciseCaloriesRouter)
app.use(routeNames.workoutBaseURL, createWorkoutRouter)
app.use(routeNames.workoutBaseURL, getWorkoutRouter)
app.use(routeNames.completedWorkoutBaseURL, completedWorkoutsRouter)
app.use(routeNames.userBaseURL, authRouter)
app.use(routeNames.sleepBaseURL, sleepRouter)
app.use(routeNames.mentalHealthBaseURL, mentalHealthRouter)
app.use(routeNames.changeDetailsBaseURL, changeProfileDetailsRouter)
app.use(routeNames.foodBaseURL, FoodSearchRouter)
app.use(routeNames.foodBaseURL, foodDatabaseRouter)
app.use(routeNames.foodBaseURL, calorieTrackRouter)
app.use(routeNames.mentalHealthBaseURL, rateMentalRouter)
app.use(routeNames.userBaseURL, getUserInfoRouter)
app.use(routeNames.userBaseURL, checkInitialTokenRouter)

/**
 * Exercise and Workout Routes
 */
// Exercise Routes

/** ---------------- Routes End------------------ */

export default app

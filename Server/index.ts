const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

import RouteNamesClass from "./utils/routeNamesClass";
const routeNames = new RouteNamesClass()

const port = process.env.PORT;
if(port === undefined){
  console.log("Please set the PORT environment variable.");
}

/**---------------- Routes Start--------------- */
//HomePage Route
// app.get('/', (req, res) => {
//     res.send('Homepage');
// });

//Authentication Routes
// const authRouter = require('./routes/authentication')
import authRouter from "./routes/User/authentication.router";
app.use(routeNames.userBaseURL, authRouter);

/**
 * Exercise and Workout Routes
 */
  //Exercise Routes
  import exerciseRouter from "./routes/Exercise/addExercise.router";
  app.use(routeNames.exerciseBaseURL, exerciseRouter)

  //Workout Routes
  import createWorkoutRouter from "./routes/Exercise/createWorkout.router";
  app.use(routeNames.workoutBaseURL, createWorkoutRouter)
  import getWorkoutRouter from "./routes/Exercise/getWorkout.router";
  app.use(routeNames.workoutBaseURL, getWorkoutRouter)

  //Completed Workout Routes
  import completedWorkoutsRouter from "./routes/Exercise/completedWorkouts.router";
  app.use(routeNames.completedWorkoutBaseURL, completedWorkoutsRouter)
//Change Profile Details Routes
// const changeProfileDetailsRouter = require('../routes/changeProfileDetails.js');
import changeProfileDetailsRouter from "./routes/User/changeProfileDetails.router";
app.use(routeNames.changeDetailsBaseURL, changeProfileDetailsRouter);


import foodSearchRouter from "./routes/Food/FoodSearchRouter";
app.use('/api/food',foodSearchRouter)

// Get User Details Routes
import getUserInfoRouter from "./routes/User/getUserInfo.router";
app.use(routeNames.userBaseURL, getUserInfoRouter);

// Check initial token Route
import checkInitialTokenRouter from "./routes/User/checkInitialToken.router";
app.use(routeNames.userBaseURL, checkInitialTokenRouter);

/**---------------- Routes End------------------ */

export default app;

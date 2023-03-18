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


const supabase = require('../dist/utils/supabaseSetUp.js');
const supabaseQuery = require('../dist/utils/databaseInterface.js');

/**---------------- Routes Start--------------- */
//HomePage Route
// app.get('/', (req, res) => {
//     res.send('Homepage');
// });

//Authentication Routes
// const authRouter = require('./routes/authentication')

import authRouter from "./routes/User/authentication.router";
app.use(routeNames.userBaseURL, authRouter);

import mentalHealthRouter from "./routes/MentalHealth/mhGetStats.router";
app.use(routeNames.mentalHealthBaseURL,mentalHealthRouter)

//Change Profile Details Routes
import changeProfileDetailsRouter from "./routes/User/changeProfileDetails.router";
app.use(routeNames.changeDetailsBaseURL, changeProfileDetailsRouter);

//Mental Health Routes
import rateMentalRouter from "./routes/rateMental.router";
app.use(routeNames.mentalHealthBaseURL, rateMentalRouter);

import FoodSearchRouter from "./routes/Food/FoodSearchRouter";
app.use('/api/food', FoodSearchRouter)

// Get User Details Routes
import getUserInfoRouter from "./routes/User/getUserInfo.router";
app.use(routeNames.userBaseURL, getUserInfoRouter);

// Check initial token Route
import checkInitialTokenRouter from "./routes/User/checkInitialToken.router";
app.use(routeNames.userBaseURL, checkInitialTokenRouter);


/**---------------- Routes End------------------ */

export default app;

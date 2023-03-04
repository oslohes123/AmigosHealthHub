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
import authRouter from "./routes/authentication.router";
app.use(routeNames.userBaseURL, authRouter);


//Change Profile Details Routes
import changeProfileDetailsRouter from "./routes/changeProfileDetails.router";
app.use(routeNames.changeDetailsBaseURL, changeProfileDetailsRouter);

//Mental Health Routes
import rateMentalRouter from "./routes/rateMental.router";
app.use(routeNames.mentalHealthBaseURL, rateMentalRouter);

import foodSearchRouter from "./routes/FoodSearchRouter";
app.use('/api/food',foodSearchRouter)

// Get User Details Routes
import getUserInfoRouter from "./routes/getUserInfo.router";
app.use(routeNames.userBaseURL, getUserInfoRouter);

// Check initial token Route
import checkInitialTokenRouter from "./routes/checkInitialToken.router";
app.use(routeNames.userBaseURL, checkInitialTokenRouter);
/**---------------- Routes End------------------ */

export default app;

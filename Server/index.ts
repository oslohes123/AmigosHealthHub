const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

import RouteNamesClass from "./utils/routeNamesClass";
const routeNames = new RouteNamesClass()

// import supabase from "./utils/supabaseSetUp";
// import { supabaseQueryClass } from "./utils/databaseInterface";
// const supabaseQuery = new supabaseQueryClass();

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
// const changeProfileDetailsRouter = require('../routes/changeProfileDetails.js');
import changeProfileDetailsRouter from "./routes/changeProfileDetails.router";
app.use(routeNames.changeDetailsBaseURL, changeProfileDetailsRouter);

// Get User Details Routes
import getUserInfoRouter from "./routes/getUserInfo.router";
app.use(routeNames.userBaseURL, getUserInfoRouter);

// Check initial token Route
import checkInitialTokenRouter from "./routes/checkInitialToken.router";
app.use(routeNames.userBaseURL, checkInitialTokenRouter);

/**---------------- Routes End------------------ */

export default app;

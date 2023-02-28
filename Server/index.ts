//Configuration
// import { Request, Response } from 'express';

// import { request } from 'http';

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

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
app.use('/api/user', authRouter);

//Change Profile Details Routes
// const changeProfileDetailsRouter = require('../routes/changeProfileDetails.js');
import changeProfileDetailsRouter from "./routes/changeProfileDetails.router";
app.use('/api/user', changeProfileDetailsRouter);

// Get User Details Routes
import getUserInfoRouter from "./routes/getUserInfo.router";
app.use('/api/user', getUserInfoRouter);

// Check initial token Route
import checkInitialTokenRouter from "./routes/checkInitialToken.router";
app.use('/api/user', checkInitialTokenRouter);

/**---------------- Routes End------------------ */

export default app;

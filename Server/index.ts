
//Configuration
import { Request ,Response } from "express";
import { request } from "http";
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());


const supabase = require('../dist/utils/supabaseSetUp.js');
const supabaseQuery = require('../dist/utils/databaseInterface.js');

/**---------------- Routes Start--------------- */
//HomePage Route
app.get("/", (req: Request, res: Response) => {
  res.send("Homepage");
});

//Authentication Routes
const authRouter = require('../routes/authentication.js');
app.use('/api/user', authRouter);

//Change Profile Details Routes
const changeProfileDetailsRouter = require('../routes/changeProfileDetails.js');
app.use('/api/user', changeProfileDetailsRouter);

/**---------------- Routes End------------------ */

export default app
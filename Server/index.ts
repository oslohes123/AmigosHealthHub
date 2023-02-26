//Configuration
import { Request ,Response } from "express";
import { request } from "http";
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const supabase = require('../dist/utils/supabaseSetUp.js');
const supabaseQuery = require('../dist/utils/databaseInterface.js');

/**---------------- Routes Start--------------- */
//HomePage Route
app.get("/", (req: Request, res: Response) => {
  res.send("Homepage");
});

//Authentication Routes
const authRouter = require('../routes/authentication.js');
app.use('/auth', authRouter);

import foodSearchRouter from "./routes/FoodSearchRouter";
app.use('/api/food',foodSearchRouter)


/**---------------- Routes End------------------ */



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

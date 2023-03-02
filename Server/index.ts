//Configuration
import { Request ,Response } from "express";
import supabase from "./utils/supabaseSetUp";
const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();
import { supabaseQueryClass } from "./utils/databaseInterface";
const supabaseQuery = new supabaseQueryClass();
const port = process.env.PORT;

/**---------------- Routes Start--------------- */
//HomePage Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({mssg: "Homepage"});
});

//Authentication Routes
import authRouter from "./routes/authentication";
app.use('/auth', authRouter);



/**---------------- Routes End------------------ */

// async function supabaseTest(){
//   const { data, error } = await supabase.from('User').select('firstName,lastName,email').eq('email', 'saathsatheesh@gmail.com'); 
//   if(error) console.error(error);
//   else console.log({data});
// }


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  // supabaseTest(); // should have output: { data: 'hello_world' }
});
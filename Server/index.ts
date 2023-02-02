
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

const supabase = require('../utils/userDatabase.ts');


/**---------------- Routes Start--------------- */
//HomePage Route
app.get("/", (req: Request, res: Response) => {
  res.send("Homepage");
});

//Authentication Routes
const authRouter = require('../routes/authentication.ts');
app.use('/auth', authRouter);



/**---------------- Routes End------------------ */





async function supabaseTest(){
  const {data,error} = await supabase.rpc('hello');
  if(error) console.error(error);
  else console.log({data});
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  supabaseTest(); // should have output: { data: 'hello_world' }
});

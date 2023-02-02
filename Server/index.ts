/**Configuration */
import { Response } from "express";
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const supabase = require('../utils/userDatabase.ts');

const port = process.env.PORT;


/**Routes */
app.get("/", (req: Request, res: Response) => {
  res.send("Some text");
});


async function supabaseTest(){
  const {data,error} = await supabase.rpc('hello');
  if(error) console.error(error);
  else console.log({data});
}


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  supabaseTest(); // should have output: { data: 'hello_world' }
});

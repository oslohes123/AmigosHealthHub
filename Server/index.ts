
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

const supabase = require('../utils/supabaseSetUp.ts');
const dbFunctions = require('../utils/supabaseInterface.js');

/**---------------- Routes Start--------------- */
//HomePage Route
app.get("/", (req: Request, res: Response) => {
  res.send("Homepage");
});

//Authentication Routes
const authRouter = require('../routes/authentication.ts');
app.use('/auth', authRouter);



/**---------------- Routes End------------------ */



// function supabaseInsert(){
//   dbFunctions.insert(supabase,'User', {firstName: "Jane",lastName:"Doe", email:"JaneDoe@gmail.com", password:"Password123", age:"30"})
// }

// async function supabaseDelete(){
//   dbFunctions.delete(supabase,'User','email',"JaneDo@gmail.com")
// }
// async function supabaseTest2(){
//   const { err } = await supabase
//     .from('User')
//     .delete()
//     .eq('email', "JaneDo@gmail.com");

//   if(err) console.error(err);
// }
async function supabaseTest(){
  const {data,error} = await supabase.rpc('hello');
  if(error) console.error(error);
  else console.log({data});
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  supabaseTest(); // should have output: { data: 'hello_world' }
});

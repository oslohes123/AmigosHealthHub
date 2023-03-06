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

import mentalHealthRouter from "./routes/mentalhealth";
app.use('/mentalhealth', mentalHealthRouter)


/**---------------- Routes End------------------ */
 async function insertData(word: string, face: number){

  const { data, error } = await supabase.from('Mental Health').insert({
    user_id : 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
    face_id: face,
    todays_word: word
   })
   if(error){
    console.log(error)
   }
 }

 const date = new Date();
 async function checkExistsToday() {
  let midnight = ''
  if (date.getDate().toString().length == 1 && date.getMonth().toString().length == 1) {
    midnight = (date.getFullYear().toString() + '-0' + (date.getMonth()+1).toString() + '-0' + date.getDate().toString());
  } else if (date.getDate().toString().length == 1) {
    midnight = (date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-0' + date.getDate().toString());
  } else if (date.getMonth().toString().length == 1){
    midnight = (date.getFullYear().toString() + '-0' + (date.getMonth()+1).toString() + '-' + date.getDate().toString());
  }
  else{
    midnight = date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-' + date.getDate().toString()
  }

  const { data, error } = await supabase.from('Mental Health').select('created_at'); 
  if(error) console.error(error);
  else {
   const value = (data[data.length - 1].created_at)
   if(value < midnight){
     console.log("Not Created")
   }
   else{ 
     console.log("Created")
   }
   console.log({value});
   console.log({midnight});
  }
 }
 async function supabaseTest(){
  checkExistsToday()
  insertData('Planned',5)
  checkExistsToday()
 }


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
   supabaseTest(); // should have output: { data: 'hello_world' }
});
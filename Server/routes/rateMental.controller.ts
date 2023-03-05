import supabase from "../utils/supabaseSetUp";
import { supabaseQueryClass } from "../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();
import { Request, Response } from "express";
import { getUserByEmail } from "../utils/userFunctions";
//
const date = new Date();
function getToday(){
 let midnight = ''
 if (date.getDate().toString().length == 1 && date.getMonth().toString().length == 1) {
   midnight = (date.getFullYear().toString() + '-0' + (date.getMonth()+1).toString() + '-0' + date.getDate().toString());
 } else if (date.getDate().toString().length == 1) {
   midnight = (date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-0' + date.getDate().toString());
 } else if (date.getMonth().toString().length == 1){
   midnight = (date.getFullYear().toString() + '-0' + (date.getMonth()+1).toString() + '-' + date.getDate().toString());
 }
 else{
   midnight = date.getFullYear().toString() + '-' + (date.getMonth()+1).toString() + '-' + date.getDate().toString();
 }
 return midnight;
}
//.eq user id not hardcoded
 async function checkExistsToday(id:string) {
  const {data, error}:any = await databaseQuery.selectWhere(supabase, 'Mental Health','user_id', id,'created_at');
  console.log(`data:${JSON.stringify(data)}`)
  if(error) {
    console.error(error);
    return true;
  }
  else if(data.length === 0){
    return false;
  }
  else {
    const recentValue = (data[data.length - 1].created_at)
    console.log(`recentValue: ${recentValue}`)
    return !(recentValue< getToday())
  }
}
//make sure user_id isn't hardcoded
//submitMentalData() will call check exists, if true, update, if false insert
  export const insertMentalData = async(req:Request, res:Response) => {

    const { face, word, email } = req.body;

    const {data, error} = await getUserByEmail(email);
    if (error){
      return res.status(400).json({mssg:"Something went wrong!", error})
    }
    const id  = data[0].id;

    if(word == ''){
      return res.status(400).json({mssg:"Can't submit an empty word"})
    }

    if(face < 1 || face > 5){
      return res.status(400).json({mssg:"Face value must be between 1-5"})
    }

    if (await checkExistsToday(id)){
      return res.status(400).json({mssg:"You have already submitted your review of your day"})
    }
    
   else{    
      const {error}: any = await databaseQuery.insert(supabase, 'Mental Health', {
        user_id : id,
        face_id: face,
        todays_word: word
        })
        if(error){
          return res.status(400).json({mssg: error})
        }
        return res.status(200).json({mssg:"Success"})
    }
  }


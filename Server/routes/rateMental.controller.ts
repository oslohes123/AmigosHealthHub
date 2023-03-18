import supabase from "../utils/supabaseSetUp";
import { supabaseQueryClass } from "../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();
import { Request, Response } from "express";
import { getUserByEmail } from "../utils/userFunctions";
import moment from "moment";
//
const date = new Date();
export function getToday(){
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
 export async function checkExistsToday(id:string) {
  const {data, error}:any = await databaseQuery.selectWhere(supabase, 'Mental Health','user_id', id,'created_at');
  if(error) {
    console.error(error);
    return true;
  }
  else if(data.length === 0){
    return false;
  }
  else {
    const recentValue = (data[data.length - 1].created_at)
    console.log(`getToday(): ${getToday()}`)
    return !(recentValue < getToday())
  }
}
  export const insertMentalData = async(req:Request, res:Response) => {

    const { face, word, email } = req.body;

    if(email == null) {
      return res.status(400).json({mssg:"You must be logged in to submit data"})
    }
    const {data, error} = await getUserByEmail(email);
    if (error){
      return res.status(400).json({mssg:"Something went wrong!"})
    }
    const id  = data[0].id;

    if(word == ''){
      return res.status(400).json({mssg:"Can't submit an empty word"})
    }

    if(face < 1 || face > 5){
      return res.status(400).json({mssg:"Face value must be between 1-5"})
    }

    if (await checkExistsToday(id)){
      const {data}:any = await databaseQuery.selectWhere(supabase, 'Mental Health','user_id', id,'MH_ID');
      const recentID = (data[data.length - 1].MH_ID)
      const { error }: any = await databaseQuery.update(supabase, 'Mental Health', {
        face_id: face,
        todays_word: word
        },
        'MH_ID',recentID)
        //update word,face, where column
        if(error){
          return res.status(400).json({mssg: error})
        }
        return res.status(200).json({mssg:"Submission for today has been updated"})
      //return res.status(400).json({mssg:"You have already submitted your review of your day"})
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
        return res.status(200).json({mssg:"Successful Submission"})
    }
  }


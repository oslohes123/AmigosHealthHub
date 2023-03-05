import supabase from "../utils/supabaseSetUp";
import { supabaseQueryClass } from "../utils/databaseInterface";
const databaseQuery = new supabaseQueryClass();
import { Request, Response } from "express";
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
 async function checkExistsToday() {
 const { data, error } = await supabase.from('Mental Health').select('created_at').eq('user_id','e9a8a99d-1852-4c2d-802c-e10d3ebdc05b'); 
 if(error) {
  console.error(error);
  return true;
 }
 else {
  const recentValue = (data[data.length - 1].created_at)
  if(recentValue < getToday()){
    return false;
  }
  else{ 
    return true;
  }
 }
}
//make sure user_id isn't hardcoded
//submitMentalData() will call check exists, if true, update, if false insert
  export const insertMentalData = async(req:Request, res:Response) => {
    if (await checkExistsToday() == true){
      //code can be changed to make the user update their review for the day
      return res.status(400).json({mssg:"You have already submiited your review of your day"})
    }
    
    const { face, word } = req.body;

    if(word == ''){
      return res.status(400).json({mssg:"Can't submit an empty word"})
    }
    if(face < 1 || face > 5){
      return res.status(400).json({mssg:"Face value must be between 1-5"})
    }
    const {data, error}: any = await databaseQuery.insert(supabase, 'Mental Health', {
      user_id : 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
      face_id: face,
      todays_word: word
      })
      if(error){
        return res.status(400).json({mssg: error})
      }
      return res.status(200).json({mssg:"Success:"})
    }


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
 async function checkExistsToday() {
 const { data, error } = await supabase.from('Mental Health').select('created_at').eq('user_id','e9a8a99d-1852-4c2d-802c-e10d3ebdc05b'); 
 if(error) {
  console.error(error);
  return true;
 }
 else {
  const recentValue = (data[data.length - 1].created_at)
  if(recentValue < getToday){
    console.log("Not Created")
    return false;
  }
  else{ 
    console.log("Created")
    return true;
  }
 }
}
  export const insertMentalData = async(req:Request, res:Response) => {
    const { face, word } = req.body;
    const {data, error}: any = await databaseQuery.insert(supabase, 'Mental Health', {
    user_id : 'e9a8a99d-1852-4c2d-802c-e10d3ebdc05b',
    face_id: 5,
    todays_word: 'Planned'
    })
    return res.status(200).json({mssg:"Success"})
}


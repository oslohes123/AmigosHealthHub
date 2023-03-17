const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { getToday, checkExistsToday } from '../../../../routes/rateMental.controller';
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
const databaseQuery = new supabaseQueryClass();
import { v4 as uuid } from 'uuid';
import { createHashedPassword, createUser } from '../../../../utils/userFunctions';

test('getToday returns a string in the format YYYY-MM-DD', (t: any) => {
  const today: string = getToday();
  const regex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
  t.true(regex.test(today));
});

test('getToday returns the current date', (t: any) => {
  const today: string = getToday();
  const date: Date = new Date();
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');
  t.is(today, `${year}-${month}-${day}`);
});


//   test('should return false when there are records for the user, but none for today', async (t: any) => {
//     // First, insert some records for the user that are not from today
//     let randomEmail: string
//     let uuid: string 
//     uuid = '1a-2345-6b7c-890d-e01f2ghij34k'
//     randomEmail = `${uuid}@gmail.com`
//     const hashedPassword = await createHashedPassword("CorrectPassword123!")
//  const {data, error}:any = await createUser({id: id, firstName: "First", lastName:"User", 
//  email:randomEmail, password: hashedPassword, age: 31});
//      console.log(`Inserting user`)
//      const {data, error}:any = await databaseQuery.insert(supabase, `User`, {id: uuid, firstName: "First", lastName:"User", 
//      email:randomEmail, password: hashedPassword, age: 31})
   
//      if(error){
//  console.log(`MHtesterror:${error}`);
//          t.fail(`Insering user: ${JSON.stringify(error)}`);
//     await databaseQuery.insert(supabase, "Mental Health", {
//       user_id: '1a-2345-6b7c-890d-e01f2ghij34k', created_at: '2020-03-03 00:00:00+00'});
//     await databaseQuery.insert(supabase, "Mental Health", {
//       user_id: '1a-2345-6b7c-890d-e01f2ghij34k', created_at: '2020-03-02 00:00:00+00'});
//     await databaseQuery.insert(supabase, "Mental Health", {
//       user_id: '1a-2345-6b7c-890d-e01f2ghij34k', created_at: '2020-03-01 00:00:00+00'});

//     // Then, check if the user has any records for today
//     const result = await checkExistsToday('1a-2345-6b7c-890d-e01f2ghij34k');
//     await databaseQuery.deleteFrom(supabase, 'Mental Health', 'user_id','1a-2345-6b7c-890d-e01f2ghij34k');
//     t.falsy(result);
//   });

//   test('should return true when there are records for the user, including one for today', async (t: any) => {
//     // First, insert some records for the user, including one for today
//     const today = getToday();
//     const id = '1a-2345-6b7c-890d-e01f2ghij34k'

//     await databaseQuery.insert(supabase, "Mental Health", {
//       user_id: '1a-2345-6b7c-890d-e01f2ghij34k', created_at: today + ' 00:00:00+00'});

//     // Then, check if the user has any records for today
//     const result = await checkExistsToday('1a-2345-6b7c-890d-e01f2ghij34k');
//     await databaseQuery.deleteFrom(supabase, 'Mental Health', 'user_id','1a-2345-6b7c-890d-e01f2ghij34k');
//     t.truthy(result);
//   });


// ;


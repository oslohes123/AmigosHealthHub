const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import { getToday } from '../../../../routes/rateMental.controller';
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import supabase from '../../../../utils/supabaseSetUp';
import {v4 as uuidv4} from 'uuid';
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
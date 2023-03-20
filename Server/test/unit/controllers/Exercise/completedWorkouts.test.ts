const test = require('ava');
import { Request, Response } from 'express';
const sinon = require('sinon');
import {v4 as uuidv4} from 'uuid';
const bcrypt = require('bcrypt');
import supabase from '../../../../utils/supabaseSetUp';
import { supabaseQueryClass } from '../../../../utils/databaseInterface';
import { createHashedPassword, createUser } from '../../../../utils/userFunctions';
const supabaseQuery = new supabaseQueryClass();


//test getACompletedWorkout with missing headers (userid, workoutname, date, time)


//test getACompletedWorkout with wrong date format

//test getACompletedWorkout with wrong time format

//test getACompletedWorkout with userid who doesn't exist

//test getACompletedWorkout with userid who has no completed workouts

//test getACompletedWorkout with userid who has a completed workout
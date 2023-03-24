import test from 'ava'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../../../../utils/supabaseSetUp'
import { SupabaseQueryClass } from '../../../../utils/databaseInterface'
import { createHashedPassword, createUser } from '../../../../utils/userFunctions'
const sinon = require('sinon')
const bcrypt = require('bcrypt')
const supabaseQuery = new SupabaseQueryClass()

test('passing test ', (t: any) => {
  t.pass()
})

// test getACompletedWorkout with missing headers (userid, workoutname, date, time)

// test getACompletedWorkout with wrong date format

// test getACompletedWorkout with wrong time format

// test getACompletedWorkout with userid who doesn't exist

// test getACompletedWorkout with userid who has no completed workouts

// test getACompletedWorkout with userid who has a completed workout

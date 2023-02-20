// Configuration
// import { Request, Response } from "express";
const express = require('express');
const exRouter = express.Router();
const fitnessFunctions = require('../controllers/fitnessController.js');

exRouter.get('/fitnessMain', fitnessFunctions.fitnessMainPage)
exRouter.get('/trackExercises', fitnessFunctions.trackExercises)
exRouter.get('/workoutPlans', fitnessFunctions.workoutPlans)



module.exports = exRouter;
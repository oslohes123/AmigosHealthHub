// Configuration
// import { Request, Response } from "express";
const express = require('express');
const fitnessRouter = express.Router();
const fitnessFunctions = require('../controllers/fitnessController.js');

fitnessRouter.get('/fitnessMain', fitnessFunctions.fitnessMainPage)
fitnessRouter.get('/trackExercises', fitnessFunctions.trackExercises)
fitnessRouter.get('/workoutPlans', fitnessFunctions.workoutPlans)

module.exports = fitnessRouter;
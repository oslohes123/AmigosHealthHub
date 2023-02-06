// Configuration
// import { Request, Response } from "express";
const express = require('express');
const exRouter = express.Router();
const fitnessFunctions = require('../controllers/fitnessController.js');

exRouter.get('', fitnessFunctions.fitnessMainPage)
exRouter.get('', fitnessFunctions.trackExercises)
exRouter.get('', fitnessFunctions.workoutPlans)



module.exports = exRouter;
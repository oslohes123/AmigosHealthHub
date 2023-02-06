// Configuration
// import { Request, Response } from "express";
const express = require('express');
const exRouter = express.Router();
const exerciseFunctions = require('../controllers/exerciseController.js');

exRouter.get('', exerciseFunctions.exerciseMainPage)
exRouter.get('', exerciseFunctions.addWorkout)
exRouter.get('', exerciseFunctions.savedWorkouts)



module.exports = exRouter;
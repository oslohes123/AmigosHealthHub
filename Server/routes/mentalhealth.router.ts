// Configuration
import { Request, Response } from "express";
import { wordValues, faceValues, reviewDay } from "../routes/mhcontroller";
const express = require('express');
const mentalHealthRouter = express.Router();
// const mhFunctions = ('../controllers/mhcontroller.ts');

mentalHealthRouter.get('/', wordValues)
mentalHealthRouter.get('/', faceValues)
mentalHealthRouter.get('/reviewday', reviewDay)
// mentalHealthRouter.get('/workoutPlans', mhFunctions.workoutPlans)
// fitnessRouter.get('/trackExercises/searchExercise')

export default mentalHealthRouter;



// authRouter.get('/login', (req:Request,res:Response) => {
//     res.status(200).json({mssg:"Login Up Page"});}
//     );
// Configuration
import { Request, Response } from "express";
const express = require('express');
const mentalHealthRouter = express.Router();
const mhFunctions = require('../controllers/fitnessController.js');

mentalHealthRouter.get('/', (req:Request,res:Response) => {
    res.status(200).json(mhFunctions.mainPage);}
    );
mentalHealthRouter.get('/reviewday', (req:Request,res:Response) => {
    res.status(200).json(mhFunctions.reviewDay);}
    );
// mentalHealthRouter.get('/workoutPlans', mhFunctions.workoutPlans)
// fitnessRouter.get('/trackExercises/searchExercise')

export default mentalHealthRouter;
;


// authRouter.get('/login', (req:Request,res:Response) => {
//     res.status(200).json({mssg:"Login Up Page"});}
//     );
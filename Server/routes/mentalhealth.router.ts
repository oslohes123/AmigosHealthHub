// Configuration
import { Request, Response } from "express";
import { wordValues, faceValues, reviewDay } from "../routes/mhcontroller";
const express = require('express');
const mentalHealthRouter = express.Router();


mentalHealthRouter.get('/wordcloud', wordValues)
mentalHealthRouter.get('/facegraph', faceValues)
mentalHealthRouter.get('/reviewday', reviewDay)


export default mentalHealthRouter;


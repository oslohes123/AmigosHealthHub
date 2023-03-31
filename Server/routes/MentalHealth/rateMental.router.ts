//Configuration for contoller that sends data to supabase from mental review your day form
// import { Request, Response } from 'express';
const express = require('express');
const rateMentalRouter = express.Router();
rateMentalRouter.use(express.json());
import { insertMentalData } from "./rateMental.controller";
import { checkToken } from "../../middleware/checkToken";
rateMentalRouter.use(checkToken);
import RouteNamesClass from "../../utils/General/routeNamesClass";
const routeNames = new RouteNamesClass()
//Routes
rateMentalRouter.post(routeNames.partialRateMental, insertMentalData);

export default rateMentalRouter;

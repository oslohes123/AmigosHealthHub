//Configuration
import { Request ,Response } from "express";
const express = require('express');
const authRouter = express.Router();


//Routes
authRouter.get('/login', (req:Request,res:Response) => {
res.status(200).json({mssg:"Login Up Page"});}
);

authRouter.get('/sign_up', (req:Request,res:Response) => {
res.status(200).json({mssg:"Sign Up Page"});}
);

export default authRouter;
export {}
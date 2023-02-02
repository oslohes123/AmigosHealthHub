//Configuration
// import { Request ,Response } from "express";
const express = require('express');
const authRouter = express.Router();


//Routes
authRouter.get('/login', (req,res) => 
res.send("Login Page")
);

authRouter.get('/sign_up', (req,res) => 
res.send("Sign Up Page")
);

module.exports = authRouter;
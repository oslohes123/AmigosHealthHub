const express = require('express');
const authRouter = express.Router();
authRouter.use(express.json());
import {loginUser, signupUser} from './authentication.controller'
import RouteNames from '../utils/routeNames';
const routeNames = new RouteNames();

authRouter.post(routeNames.partialLoginURL, loginUser);
authRouter.post(routeNames.partialSignupURL, signupUser);

export default authRouter;
export {}
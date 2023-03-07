const express = require('express');
const authRouter = express.Router();
authRouter.use(express.json());
import {loginUser, signupUser} from './authentication.controller'
import RouteNamesClass from "../../utils/routeNamesClass";
const routeNames = new RouteNamesClass()

authRouter.post(routeNames.partialLoginURL, loginUser);
authRouter.post(routeNames.partialSignupURL, signupUser);

export default authRouter;
export {}
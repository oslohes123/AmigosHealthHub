const express = require('express');
const authRouter = express.Router();
authRouter.use(express.json());
import {loginUser, signupUser} from './authentication.controller'

/**
 * All these routes start with /api/user
*/

authRouter.post('/login', loginUser);

authRouter.post('/sign_up', signupUser);

export default authRouter;
export {}
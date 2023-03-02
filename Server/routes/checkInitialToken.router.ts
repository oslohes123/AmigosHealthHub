const express = require('express');
const checkInitialTokenRouter = express.Router();
checkInitialTokenRouter.use(express.json());
import { checkInitialToken } from "./checkInitialToken.controller";

/**
 * All these routes start with /api/user
 */
export const checkInitialTokenRoute = "/api/user/checkInitialToken"
//Routes
checkInitialTokenRouter.get('/checkInitialToken', checkInitialToken);

export default checkInitialTokenRouter;

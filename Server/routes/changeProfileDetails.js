const express = require('express');
const changeProfileDetailsRouter = express.Router();
changeProfileDetailsRouter.use(express.json());
const userFunctions = require('../controllers/changeProfileDetails');
const checkToken = require('../middleware/checkToken');

changeProfileDetailsRouter.use(checkToken); //Routes are protected. 
/**
 * All these routes start with /api/user
 */
changeProfileDetailsRouter.post('/changeProfileDetails/stats', userFunctions.changeStats)

changeProfileDetailsRouter.post('/changeProfileDetails/password', userFunctions.changePassword)

changeProfileDetailsRouter.post('/deleteAccount', userFunctions.deleteAccount)


module.exports = changeProfileDetailsRouter;
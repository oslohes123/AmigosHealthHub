const express = require('express');
const changeProfileDetailsRouter = express.Router();
changeProfileDetailsRouter.use(express.json());
const userFunctions = require('../controllers/changeProfileDetails');
const checkToken = require('../middleware/checkToken');

changeProfileDetailsRouter.use(checkToken); //Routes are protected. 

changeProfileDetailsRouter.post('/changeProfileDetails/stats', userFunctions.changeStats)

changeProfileDetailsRouter.post('/changeProfileDetails/password', userFunctions.changePassword)


module.exports = changeProfileDetailsRouter;
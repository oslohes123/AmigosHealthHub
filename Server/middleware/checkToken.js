const jwtToken = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const supabase = require("../dist/utils/supabaseSetUp")
const supabaseQueryClass = require("../dist/utils/databaseInterface")
const supabaseQuery = new supabaseQueryClass();

/**
 * Middleware that checks that every request has an authenticated user
 */

const checkToken = async(req, res,next) => {

//Check user making request is authenticated
 const {authorization} = req.headers
//  console.log(req.headers)
 //NO authorisation header
 if(!authorization){    
    return res.status(401).json({error: "No Authorisation Header"})
 }

 //Extract token from bearer token
 const token = authorization.split(' ')[1];
 console.log(`token: ${token}`);

 try{
   const {id} =  jwtToken.verify(token, process.env.JWTSECRET);

   req.user = await supabaseQuery.selectWhere(supabase, 'User','id', id, 'id');

    next();
 }
 catch(error){
    console.error(error);
    return res.status(401).json({error:"Request Failed due to Authentication"})
 }
}


module.exports = checkToken;
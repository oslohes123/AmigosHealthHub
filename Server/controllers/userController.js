require('dotenv').config()
const supabase = require("../dist/utils/supabaseSetUp")
const supabaseQueryClass = require("../dist/utils/databaseInterface")
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwttoken = require('jsonwebtoken');
const supabaseQuery = new supabaseQueryClass();


//Create jwtToken
function createJWToken(id){
    return jwttoken.sign({id},process.env.JWTSECRET,{expiresIn: '3d'});
}


const loginUser = async(req,res) => {

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({mssg: "All Fields Must Be Filled"})
    }

    const{data, error} = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',email);

    if(error){
        console.error(error);
        res.status(400).json({mssg: error.message});
       }
    
    if(data.length === 0){
        res.status(400).json({mssg: "Incorrect Email"})
    }

    const match = await bcrypt.compare(password, data[0].password);
   if(match){
    const token = createJWToken(data[0].id);
    res.status(200).json({email: data[0].email, token, mssg:"Successful Login"});
   }
   else res.status(400).json({mssg:"Incorrect Password"});

}


const signupUser = async(req,res) => {
// res.json({mssg: "signup user"})
const {firstName, lastName, email, password, age} = req.body;

if(!email || !password ||!firstName ||!lastName ||!age){
    res.status(400).json({mssg: "All Fields Must Be Filled"})
}

if(!validator.isEmail(email)){
    res.status(400).json({mssg: "Invalid Email"})
}
if(!validator.isStrongPassword(password)){
    res.status(400).json({mssg: "Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"});
}

const {data,error} = await supabaseQuery.selectWhere(supabase,'User','email',req.body.email);
if(error){
    console.error(error);
    res.status(400).json({mssg:error.message});
}
else{
    if (data.length === 1) res.json({mssg: "User already exists!"});

    else{
        
        console.log(`firstName: ${firstName}` );
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(`hashedPassword: ${hashedPassword}`);

        const {data, error} = await supabaseQuery.insert(supabase,'User',{firstName, lastName, 
            email,password: hashedPassword, age});
    
        
        console.log({data});

        if(error){
            console.error(error);
            res.status(400).json({mssg:error.message});
        }
        else{ 
            const token = createJWToken(data[0].id);
            res.status(200).json({email, token});
        }
    }
    }
    
}

module.exports.loginUser = loginUser;
module.exports.signupUser = signupUser;
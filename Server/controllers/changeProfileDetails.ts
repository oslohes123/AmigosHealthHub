require('dotenv').config()
import { Request, Response } from 'express';
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
const bcrypt = require('bcrypt');
const validator = require('validator');
const supabaseQuery = new supabaseQueryClass();


export const changeStats = async(req:Request,res:Response) => {

    const {firstName, lastName, prevEmail, newEmail, age} = req.body;

    console.log(JSON.stringify(req.body));
    
    if(!firstName || !lastName ||!newEmail||!age){
        return res.status(400).json({mssg:"All Fields Must Be Filled"});
    }

    if(prevEmail !== newEmail){
        if(!validator.isEmail(newEmail)){
            console.log("Invalid New Email")
            return res.status(400).json({mssg: "Invalid New Email"})
        }


        //Check that new email is available
        const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
        ,'email',newEmail,'*');

        if(error){
            console.error(error);
            return res.status(500).json({mssg: error.message});
        }

        if(data.length === 0){
            console.log("New Email Available");
            //Update user details
            const {data, error}:any = await supabaseQuery.update(supabase, 'User', {firstName, lastName, 
            email: newEmail, age}, 'email', prevEmail)
            if(error){
                return res.status(500).json({mssg: error.message});
            }
            return res.status(200).json({mssg: "Successful New Email"})
        }

        if(data.length > 0){
            console.log("Email Already Exists");
            return res.status(400).json({mssg: "Email Already Exists"})
        }
    
    }

    //As new email == previous email, update the other fields
    else{
        const {data, error}:any = await supabaseQuery.update(supabase, 'User', {firstName, lastName, age}
        , 'email', prevEmail)
        if(error){
            return res.status(500).json({mssg: error.message});
        }
        return res.status(200).json({mssg: "Successful Update"})
    }

}

export const changePassword = async(req:Request,res:Response) => {
    const {email, oldPassword , newPassword} = req.body;

    console.log(JSON.stringify(req.body));
    if(!validator.isStrongPassword(newPassword)){
        console.log("Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol")
        return res.status(400).json({mssg: "Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"});
    }

    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',email,'*');

    console.log(`data in changePassword: ${JSON.stringify(data)}`)

    if(error){
        return res.status(500).json({mssg: error.message});
    }
    if(data.length > 0){
        console.log("data.length>0 in changeProfileDetails")
        const match = await bcrypt.compare(oldPassword, data[0].password);
        if(!match){
            console.log("Old password doesn't match!")
            return res.status(400).json({mssg: "Old password doesn't match!"})
        }
        else{
            console.log("New Password Set!")
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            const {data, error}:any = await supabaseQuery.update(supabase, 'User', {
                password: hashedPassword}, 'email', email);

                if(error){
                    return res.status(500).json({mssg: error.message});
                }
            return res.status(200).json({mssg: "New Password Set!"})
        }
    }

    else{
        console.log("data.length<1 in changeProfileDetails")
        return res.status(400).json({mssg: "Email doesn't exist in our db"});
    }
}

/**
 * Implementation needs to change to delete this user from all tables
 */

export const deleteAccount = async(req:Request, res:Response) =>{
     const {email, password}= req.body;
     if(!email || !password){
        res.status(400).json({mssg:"Email or Password are empty!"})
     }

    const{data, error}:any = await supabaseQuery.selectWhere(supabase,'User'
    ,'email',email,'*');

     if(error){
        res.status(400).json({error})
     }
     console.log(`data: ${JSON.stringify(data)}`);
     console.log(`data.length: ${data.length}`);
    if(data.length <1){
        res.status(400).json({mssg:"Incorrect Email!"})
    }

    else{
        //email is present in database, check if email & password are correct
        const match = await bcrypt.compare(password, data[0].password);
        if(match){
                //delete account
                const {error}:any = supabaseQuery.deleteFrom(supabase, 'User','email',email);
                if(error){
                    console.log("Failed to delete account!")
                    res.status(400).json({mssg:"Failed to delete account!"})
                }
                else {
                    console.log("Account Deleted!")
                    res.status(200).json({mssg:"Account Deleted!"})
                }
           }
           else {
            console.log("Incorrect Password");
            return res.status(400).json({mssg:"Incorrect Password"});
            }
        

    }

}

// module.exports.changeStats = changeStats;
// module.exports.changePassword = changePassword;
// module.exports.deleteAccount = deleteAccount;
export {};
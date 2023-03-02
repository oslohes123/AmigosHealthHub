require('dotenv').config()
import { Request, Response } from 'express';
import supabase from '../utils/supabaseSetUp'
import {supabaseQueryClass} from '../utils/databaseInterface'
const bcrypt = require('bcrypt');
import { isEmail, isStrongPassword } from '../utils/validators';
const supabaseQuery = new supabaseQueryClass();
import { createHashedPassword, getUserByEmail, updateUser, verifyPassword } from '../utils/userFunctions';

export const changeStats = async(req:Request,res:Response) => {

    const {firstName, lastName, prevEmail, newEmail, age} = req.body;

    console.log(JSON.stringify(req.body));
    
    if(!firstName || !lastName ||!newEmail||!age){
        return res.status(400).json({mssg:"All Fields Must Be Filled"});
    }

    if(prevEmail !== newEmail){
        if(!isEmail(newEmail)) return res.status(400).json({mssg: "Invalid New Email"})
    
        //Check that new email is available
        const {data, error}: any = await getUserByEmail(newEmail)

        if(error) return res.status(500).json({mssg: error.message});
    
        if(data.length === 0){
          
            const {data, error}: any = await updateUser(prevEmail, {firstName, lastName, 
                email: newEmail, age})

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
        
       const {data, error}:any =  await updateUser(prevEmail,{firstName, lastName, age} )
        if(error){
            return res.status(500).json({mssg: error.message});
        }
        return res.status(200).json({mssg: "Successful Update"})
    }

}

export const changePassword = async(req:Request,res:Response) => {
    const {email, oldPassword , newPassword} = req.body;

    if(!email || !oldPassword ||!newPassword) return res.status(400).json({
        mssg:"All Fields Must Be Filled"
    });
    

    if(!isStrongPassword(newPassword)) return res.status(400).json({
        mssg: "Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"
    });
    

    const {data, error}: any = await getUserByEmail(email);

    if(error){
        return res.status(500).json({mssg: error.message});
    }
    if(data.length > 0){
        const passwordMatches = await verifyPassword(oldPassword, data[0].password)

        if(!passwordMatches) return res.status(400).json({mssg: "Old password doesn't match!"})
        
        else{
            const hashedPassword = await createHashedPassword(newPassword)

            const {data, error}: any = await updateUser(email, {password: hashedPassword})

            if(error) return res.status(500).json({mssg: "Sorry, something went wrong", err:error.message});

            return res.status(200).json({mssg: "New Password Set!"})
        }
    }

    else return res.status(400).json({mssg: "Email doesn't exist in our database"});
    
}

/**
 * Implementation needs to change to delete this user from all tables(cascade delete)
 */

export const deleteAccount = async(req:Request, res:Response) =>{
     const {email, password}= req.body;
     if(!email || !password){
        res.status(400).json({mssg:"Email or Password are empty!"})
     }

    const {data, error}: any = await getUserByEmail(email)

     if(error){
        res.status(400).json({error})
     }
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

export {};
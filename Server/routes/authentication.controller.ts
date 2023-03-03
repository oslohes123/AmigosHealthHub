require('dotenv').config()
import { Request, Response } from 'express';
import { createUser, getUserByEmail, verifyPassword, createHashedPassword, createToken} from '../utils/userFunctions';
import { isEmail, isAlpha, isStrongPassword } from '../utils/validators';
import { UserInterface } from '../utils/userInterface';

export const loginUser = async(req:Request,res:Response) => {

    const {email, password} = req.body;
     
    if(!email || !password) return res.status(400).json({
        mssg: "All Fields Must Be Filled"
    })
    
    const {data,error} = await getUserByEmail(email);

    if(error) return res.status(400).json({
        mssg: error.message
    });
       
    
    if(data.length === 0) return res.status(400).json({
        mssg: "Incorrect Email"
    })
    
    const passwordMatches = await verifyPassword(password, data[0].password);

    if(passwordMatches) return res.status(200).json({
    firstName: data[0].firstName,
    email: data[0].email, 
    token: createToken(data[0].id), 
    mssg:"Successful Login"
    });
   
   else return res.status(400).json({
    mssg:"Incorrect Password"
    });
    
}


export const signupUser = async(req:Request,res:Response) => {

    const {firstName, lastName, email, password, age} = req.body;

    if(!email || !password ||!firstName ||!lastName ||!age){
        return res.status(400).json({
            mssg: "All Fields Must Be Filled"
        })
    }

    if(!isEmail(email)) return res.status(400).json({
        mssg: "Invalid Email"
    })

    if(!(isAlpha(firstName) && isAlpha(lastName))) return res.status(400).json({
        mssg: "First name and last name must only contains letters a-z or A-Z"
    });

    if(!isStrongPassword(password)) return res.status(400).json({
        mssg: "Password Structure must have atleast 8 characters, 1 lower case,1 upper case, 1 number, 1 symbol"
    });

    const {data, error}:any  = await getUserByEmail(req.body.email);

    if(error) return res.status(400).json({
        mssg:"Sorry, something went wrong!", 
        err:error.message
    });
    
    else{

            if (data.length === 1) return res.status(400).json({
                mssg: "User already exists!"
            });
            
            else{
        
                let hashedPassword:string;
                
                try{
                    hashedPassword = await createHashedPassword(password);
                }
                catch(error: any){
                    return res.status(400).json({mssg:"Sorry, something went wrong!", err: error.message});
                }

                const user: UserInterface = {firstName, lastName,email,password: hashedPassword, age}; 
                const {data, error} = await createUser(user)

                if(error) return res.status(400).json({mssg:"Sorry, something went wrong!", err:error.message});
                else{ 
                    const token = createToken(data[0].id);
                    return res.status(200).json({firstName,email, token, mssg: "Successful sign up!"});
                }
            }
        }
        
    }

export {};

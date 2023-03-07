import { getUserByEmail } from "../../utils/userFunctions";
import { Request, Response } from "express";

export const getInfo = async (req:Request, res:Response) => {
    const { email } = req.headers;
    console.log(`request in getInfo: ${req}`)
    console.log(`email in getUserInfo: ${email}`);
    if (!email) return res.status(400).json({ mssg: 'Email must be provided' });
    
     // @ts-ignore
    const { data, error }:any  =  await getUserByEmail(email, 'firstName, lastName, email, age')
    console.log(`data in getUserInfo: ${data}`);
    if (error) return res.status(400).json({ mssg: error.message });
    
    else if (data.length === 0) return res.status(400).json({ mssg: 'User not found!' });
    
    else return res.status(200).json({ user: data[0] });
};

import { Request, Response } from "express";

export const createWorkout =async (req:Request, res: Response) => {
    return res.status(200).json({mssg: "This is the createWorkout Route"}) 
}
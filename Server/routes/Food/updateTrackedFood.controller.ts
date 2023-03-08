require("dotenv").config();
import { Request, Response } from "express";

export const foodUpdate = (req: Request, res: Response) => {
    console.log(req.body)
    console.log("Food Updated");
    res.status(200).send("Food Updated");
}
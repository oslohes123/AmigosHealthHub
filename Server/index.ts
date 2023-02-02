/**Configuration */
import { Response } from "express";
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();


const port = process.env.PORT;


/**Routes */
app.get("/", (req: Request, res: Response) => {
  res.send("Some text");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

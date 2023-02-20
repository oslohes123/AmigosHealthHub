const express = require("express")
const app = express()

app.get("/", (req, res) => {
    console.log("Hey")
})

const fitnessRouter = require("./routes/fitness")

app.use("/fitnessPage", fitnessRouter)

app.listen(3000)
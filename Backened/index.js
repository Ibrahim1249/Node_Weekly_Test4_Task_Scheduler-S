const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const { route } = require("./Routers/taskRouter.js");
const cron = require("node-cron");
const { sendMailToUser } = require("./Controllers/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : false}));


mongoose.connect(process.env.DB_MONGO).then(()=>{
    app.listen(port,()=>{
        console.log("server running on port" , port)
    })
}).catch((error)=>{
    console.log(error.message)
})

app.use("/api/v1",route)

// Schedule tasks 

cron.schedule("0 10 * * *",(req,res)=>{

    sendMailToUser()
})
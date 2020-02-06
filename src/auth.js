const express=require("express");
const app = express();
const jwt=require("jsonwebtoken")
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");
const userRoute=require("./routes/user");
const taskRoute=require("./routes/task");
const port= process.env.PORT2
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)
var hbs= require("hbs")
app.set("view engine" , "hbs")

app.listen(port, ()=>
{
    console.log("Server Started",port);
})


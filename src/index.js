const express=require("express");
const app = express();
const jwt=require("jsonwebtoken")
require("./db/mongoose");
const User=require("./models/user");
const Task=require("./models/task");
const userRoute=require("./routes/user");
const taskRoute=require("./routes/task");
const port=process.env.PORT;
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(userRoute)
app.use(taskRoute)

var hbs= require("hbs")
app.set("view engine" , "hbs")
const multer=require("multer")
const upload=multer({
    dest:"images",
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(docx|doc)$/))
        {
            return cb(new Error("Please uoload a word Document"))
        }
       cb(undefined,true)
    }
})


app.post("/data",(req,res)=>
{
    res.send(req.body)
   console.log(req.body)
    console.log("fsdd")
})

// app.post("/upload",upload.single("upload"),(req,res)=>
// {
//     res.send();
// },(error,req,res,next)=>
// {
//    res.status(400).send({error:error.message});
// })


//   app.get("/",(req,res)=>
//   {
//       res.send("Hello");
//   })

app.listen(port, ()=>
{
    console.log("Server Started",port);
})


// const main=async ()=>
// {
// //   const task=await Task.findById("5d15188f2c7cd01e14d085e8")
// //   await task.populate("owner").execPopulate()
// //   console.log(task.owner)


// const user=await User.findById("5d15183e6484902f802876d2")
// await user.populate("tasks").execPopulate()
// console.log(user.tasks)
// }
// main()


const express=require("express")
const router=express.Router();
const User=require("../models/user")
const auth=require("../middleware/auth")
const jwt =require("jsonwebtoken")
const sharp=require("sharp");
const Emails=require("../emails/account")
router.get("/",(req,res)=>
{
  res.render("index")
})

router.get("/users/me",auth,async (req,res)=>
{ 
  try{

    res.render("user",{
      name:req.user.name,
      age: req.user.age,
      email:req.user.email
     })
    

  }
  catch(e)
  {
    res.send("Error Occured")
  }
})

 router.get("/users/create",(req,res)=>
 {
    res.render("create")
 })

 router.get("/users/login",async (req,res)=>
 {
     res.render("login")
 })
 router.post("/users/logout",auth,async (req,res)=>
 {
    
     try
     {
   
     req.user.tokens=req.user.tokens.filter((token)=>
     {
         return token.token!==req.token
     })
     await req.user.save()
     req.header['authorization']=undefined
     res.redirect("/")
     }
     catch(e)
     {
      res.send("Error Occured")
     }
 })
 



// router.get("/users/:id",async (req,res)=>
// {
//   try{
//    const _id=req.params.id;  
//   const user=await User.findById(_id);
  
//   if(user)
//   res.send(user);
//   }
//   catch(e)
//   {
//       console.log(e)
//   }
// })

router.get("/users/delete",auth,async (req,res)=>
{
  try{
     await req.user.remove()
      Emails.sendExitEmail(req.user.email,req.user.name)
    res.redirect("/")
    }
  catch(e)
  {
    res.send("Error Occured")
  }
})

router.post("/users/create",async(req,res)=>
{
 
    try{  
         const user =await new User(req.body);
         const token=await user.generateToken(user);
        // req.header['authorization']=token
        console.log(req.headers)
         Emails.sendWelcomeEmail(user.email,user.name)
         res.redirect("/users/me")
      }
    catch(e)
    {
      res.send("Error Occured")
        return;
    }
})

router.post("/users/login",async (req,res)=>
{
    try
    {
    const user=await User.findByCredentials(req.body.email,req.body.password);
    const token=await user.generateToken();
    // req.header['authorization']=token
    console.log(req.header['authorization'])
   
     res.redirect("/users/me")
    }
    catch(e)
    {
     res.send({"error": "User Not Found , Please Try Again"})
    }
})

router.post("/users/logout",auth,async (req,res)=>
{
 
    try
    {
  
    req.user.tokens=req.user.tokens.filter((token)=>
    {
        return token.token!==req.token
    })
    await req.user.save()
    req.header['authorization']=undefined
    res.redirect("/")
    }
    catch(e)
    {
      res.send("Error Occured")
    }
})


router.post("/users/logoutAll",auth,async (req,res)=>
{
  console.log(req.token)
    try
    {
      console.log(req.user)
    req.user.tokens=[]
    await req.user.save()
    req.header['authorization']=undefined

    res.redirect("/")
    }
    catch(e)
    {
      res.send("Error Occured")
    }
})

router.get("/users/update",auth,async (req,res)=>
{
    res.render("updateUser")
})
router.post("/users/update",auth,async (req,res)=>
{
  
    const updates= Object.keys(req.body);
    const allow=["name","age","email","password"]
    const valid=updates.every((update)=>allow.includes(update));
    if(!valid)
    {
        return res.send({error:"Invalid Updates"});
    }
    try{
         const user=req.user
        updates.forEach((update)=>
        {
          user[update]=req.body[update];
        })
      await user.save();
    //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
      res.redirect("/users/me");
    }
    catch(e)
    {
      res.send("Error Occured")
        return;
    }

})

const multer=require("multer")

const upload=multer({
    limits:{
      fileSize:1000000
  },
  fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
      {
          return cb(new Error("Please upload a jpg or jpeg or png file"))
      }
     cb(undefined,true)
  }
})

// router.post("/users/me/upload",auth,upload.single("upload"),async (req,res)=>
// {
//     const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//     req.user.uploads=buffer
//     await req.user.save()
//     res.send();
// },(error,req,res,next)=>
// {
//    res.status(400).send({error:error.message});
// })

// router.delete("/users/me/del",auth,async (req,res)=>
// {
//    req.user.uploads=undefined;
//    await req.user.save();
//    res.send("Pic Deleted")

// })


// router.get("/users/:id/uploads",async (req,res)=>
// {
//     try{
//         const user=await User.findById(req.params.id)
       
       
//         if(!user || !user.uploads)
//         {
//           throw new Error()
//         }
//      res.set("Content-Type","image/png")
//      res.send(user.uploads)
//     }
//     catch(e)
//     {
//         res.send({error:"Invalid Request"})
//     }
// })

module.exports=router; 
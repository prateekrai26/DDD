const jwt = require("jsonwebtoken")
const User=require("../models/user")

const auth=async (req,res,next)=>
{
 
   try{
     const token= req.header['authorization']
     console.log(token)
     const data=jwt.verify(token,process.env.SECRET)
     console.log(data)
     const user=await User.findOne({_id:data._id})
    if(!user)
    {
      throw new Error()
    }
    req.user=user
    req.token=token
    next()
   }catch(e)
   {
    res.send({"error":"Please Authenticate"})
   }
}
module.exports=auth;


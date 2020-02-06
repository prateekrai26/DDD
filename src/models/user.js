const mongoose =require("mongoose");
const validator =require("validator"); 
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Task=require("../models/task")
const userSchema=new mongoose.Schema(
    {
        name:{
             type:String,
             required:true,
             trim:true
        },
        age:
        {
         type: Number,
         default:0,
         validate(value)
         {
             if(value<0)
             {
                 throw new Error("Age must be a positive no");
             }
         }
        },
        email:{
            type:String,
            unique:true,
            required:true,
             trim:true,
            lowercase:true,
          validate(value)
          {
             if(!validator.isEmail(value))
             {
                throw new Error("Provide Correct Email");
             }
          }
        },
        password:
        {
            type:String,
            required:true,
            trim:true,
            minlengtth: 7,
            validate(value)
            {
               if(value.toLowerCase().includes("password"))
               {
                throw new Error("Password Could not Contain password");  
               }
            }
        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }


        ],
        uploads:
        {
            type:Buffer
        }
    },
    {
        timestamps:true
    }
);


userSchema.statics.findByCredentials=async (email,password)=>
{
    const user=await User.findOne({email})
    if(!user)
    {
        throw new Error("Unable to find User");
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        throw new Error("Wrong Details")
    }
    return user
}

userSchema.methods.toJSON=function()
{
    const user=this
    const userObject=user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.uploads
    delete userObject.token
    return userObject
}


userSchema.methods.generateToken=async function()
{
    const user=this
    const token=jwt.sign({_id: user._id.toString()},process.env.SECRET)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.virtual("tasks",{
  ref:"Task",
  localField:"_id",
   foreignField:"owner"
})

userSchema.pre('save',async function(next){
  const user=this;
  if(user.isModified("password"))
  {
      user.password= await bcrypt.hash(user.password,8)
  }

  next();
})

userSchema.pre('remove',async function(next){
    const user=this;
     await Task.deleteMany({owner:user._id})
    next();
  })
  

const User=mongoose.model("User",userSchema)

module.exports= User;
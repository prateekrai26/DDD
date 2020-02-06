const mongoose =require("mongoose");//const validator =require("validator");
mongoose.connect(process.env.MONGOD_URL,{
   useNewUrlParser:true,
   useCreateIndex:true ,
   useFindAndModify:false,
   useUnifiedTopology: true
})

// const User=mongoose.model("User",{
//     name:{
//          type:String,
//          required:true,
//          trim:true
//     },
//     age:
//     {
//      type: Number,
//      default:0,
//      validate(value)
//      {
//          if(value<0)
//          {
//              throw new Error("Age must be a positive no");
//          }
//      }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//       validate(value)
//       {
//          if(!validator.isEmail(value))
//          {
//             throw new Error("Provide Correct Email");
//          }
//       }
//     },
//     password:
//     {
//         type:String,
//         required:true,
//         trim:true,
//         minlengtth: 7,
//         validate(value)
//         {
//            if(value.toLowerCase().includes("password"))
//            {
//             throw new Error("Password Could not Contain password");  
//            }
//         }
//     }
// })
// const me = new User({
//     name:"Rag",
//     age:20,
//     email:"cpraergddfewh@gmil.com",
//     password:"26021997password"
// })

// me.save().then((me)=>
// {
//   console.log(me);
// }).catch((error)=>
// {
//   console.log(error)
// })

module.exports=mongoose;
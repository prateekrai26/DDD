
const mongodb=require("mongodb");
const MongoClient=mongodb.MongoClient;
const ObjectId=mongodb.ObjectID;
const connectionUrl="mongodb://localhost"
const dataBaseName="task";
MongoClient.connect(connectionUrl,{useNewUrlParser:true},(error,client)=>
{
    if(error)
      conole.log(error)
    else
     {
       const db=client.db(dataBaseName);
       db.collection("users").insertOne(
        {
          name:"Prateek",
          age:27
        },(error,data)=>
        {
           console.log(data.ops);
        }
      )
     
        // db.collection("users").insertMany(
        //    [
        //      {
        //       name:"Prateek",
        //         age:27
        //      },
        //      {
        //       name:"Amit",
        //        age:27
        //      }
        //    ],(error,data)=>
        //    {
        //      if(error)
        //       console.log(error);
        //       else 
        //         console.log(data.ops);
        //    }

        // )

        db.collection("users").find({}).toArray((error,users)=>
        {
          if(error)
          console.log(error)
        else
        {
          console.log(users);
        }
        })

      //  db.collection("users").findOne({_id:new ObjectId("5cf0d7199582b51ab86103fa")},(error,user)=>
      //  {
      //     console.log(user);

      //  })

//       const UpdateData =db.collection("users").updateOne({
//         _id:new ObjectId("5cf0d679964bd50e90fb6dc1")
//       },
//        {
//          $set:{
//            name:"Akshat"
//          }
//        }
        
//       )

//   UpdateData.then((result)=>
// {
//   console.log(result)
// }).catch((error)=>
// {
//     console.log(error)
// })

// const UpdateData =db.collection("users").updateMany({},
//  {
//    $set:{
//      age:40
//    }
//  }
  
// )

// UpdateData.then((result)=>
// {
// console.log(result)
// }).catch((error)=>
// {
// console.log(error)
// })

    // db.collection("users").deleteOne({ _id:new ObjectId("5cf0d679964bd50e90fb6dc1")}).then((result)=>
    // {
    //   console.log(result)
    // }).catch((error)=>
    // {
    // console.log(error)  
    // })

    // db.collection("users").deleteMany({age:27}).then((result)=>
    // {
    //   console.log(result)
    // }).catch((error)=>
    // {
    // console.log(error)  
    // })



     } 
    
})


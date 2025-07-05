const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user")
const app = express();

app.use(express.json());


app.post("/signup",async(req,res)=>{

  const user= new User(req.body);

  try{
  await user.save();
  res.send("User Added successfully");
  }
  catch(err){
    res.status(400).send("Error saving the user"+err.message);
  }
 
});

//Get user by email

app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;

  try{
    const user= await User.find({emailId:userEmail});
    if(user.length ===0){
      res.status(404).send("user not found");
    }

    res.send(user);
  }
  catch(err){
    res.status(400).send("Error fetching the user: " + err.message);
  }
})

app.get("/feed",async (req,res)=>{
try{
    const users= await User.find({});
    if(users.length ===0){
      res.status(404).send("No users found");
    }
    res.send(users)
}
catch(err){
    res.status(400).send("Error fetching users: " + err.message);
  }


  
})
// delete user by id
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!!");
  }
  catch(err){
    res.status(400).send("Error fetching users: " + err.message);
  } 
});
// Update user by id

app.patch("/user",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  try{
    await User.findByIdAndUpdate(userId,data,{
      runValidators: true
    });
    res.send("User updated successfully!!");
  }
   catch(err){
    res.status(400).send("Error fetching users: " + err.message);
  } 
})



// app.patch("/user",async(req,res)=>{
//   const useremail=req.body.emailId ;
//   const data=req.body;
//   try{
//     await User.findOneAndUpdate({emailId:useremail},data,{
//       returnDocument: "after",
//     });
//     res.send("User updated successfully!!");
//   }
//    catch(err){
//     res.status(400).send("Error fetching users: " + err.message);
//   } 
// })


connectDB().then(()=>{
    console.log("Database connected successfully");
    
app.listen(3000, () => {
  console.log("Server is listing on port 3000...");
});

})
.catch((err)=>{
    console.error("database cannot be connected");
});




const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");

const cookieParser= require("cookie-parser");

const app = express();
const {validateSignUpData}=require("./utils/validation");
app.use(express.json());
app.use(cookieParser()); 


app.post("/signup",async(req,res)=>{
  try{
    validateSignUpData(req);
const {firstName,lastName,emailId,password,gender,skill}=req.body;

const passwordhash=bcrypt.hashSync(password,10);

  const user= new User({
    firstName,
    lastName,
    emailId,
    password:passwordhash,
    gender,
    skill,
  });
  await user.save();
  res.send("User Added successfully");
  }
  catch(err){
    res.status(400).send("Error saving the user"+err.message);
  }
 
});


app.post("/login",async(req,res)=>{

  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid=await user.validatePassword(password) ;
    if(isPasswordValid){
      const token= await user.getJWT();
      console.log(token);
      res.cookie("token",token,{ expires: new Date(Date.now() + 1*3600000), httpOnly: true });
      res.send("Login successful");
    }
    else{
      res.send("Invalid Credentials");
    }

  }
   catch(err){
    res.status(400).send("Error saving the user  "+err.message);
  }
})

app.get("/profile",userAuth,async(req,res)=>{

try
 {
  const user=req.user; // user is attached to request object by userAuth middleware
  res.send(user);}
  catch(err){
    res.status(400).send("Error saving the user  "+err.message);
  }
  
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{

  const user=req.user;

  console.log("Sending a connection request");

  res.send(user.firstName +"sent the connection request to you");
})

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
    const ALLOWED_UPDATES=["firstName","lastName","about","age","userId","about","gender","skill","photoUrl"];
      const isUpdateAllowed=Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key));
  if(!isUpdateAllowed){
    return res.status(400).send("Invalid update fields");
  }

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




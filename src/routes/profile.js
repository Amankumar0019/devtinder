const express = require('express');
const {userAuth}=require("../middlewares/auth");

const profileRouter= express.Router();

profileRouter.get("/profile",userAuth,async(req,res)=>{

try
 {
  const user=req.user; // user is attached to request object by userAuth middleware
  res.send(user);}
  catch(err){
    res.status(400).send("Error saving the user  "+err.message);
  }
  
});


profileRouter.patch("/user",async(req,res)=>{
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


module.exports=profileRouter;
const express = require('express');
const {userAuth}=require("../middlewares/auth");
const {validatesEditProfileData}=require("../utils/validation");

const profileRouter= express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{

try
 {
  const user=req.user; // user is attached to request object by userAuth middleware
  res.send(user);}
  catch(err){
    res.status(400).send("Error saving the user  "+err.message);
  }
  
});


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validatesEditProfileData(req)){
        throw new Error("Invalid Edit Request")
    }

    const loggedInUser=req.user;

    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName},Profile updated successfully`,
    data:loggedInUser});
  }
   catch(err){
    res.status(400).send("Error fetching users: " + err.message);
  } 
})


module.exports=profileRouter;
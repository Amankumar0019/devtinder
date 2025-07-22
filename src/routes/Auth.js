const express = require('express');
const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt= require("bcrypt");
const {userAuth}=require("../middlewares/auth");

const authRouter=express.Router();



authRouter.post("/signup",async(req,res)=>{
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
 const savedUser= await user.save();
   const token= await user.getJWT();

      res.cookie("token",token,{ expires: new Date(Date.now() + 1*3600000), httpOnly: true });
      res.json({message:"User Added sucessfully!",data:savedUser});
  }
  catch(err){
    res.status(400).send("Error saving the user"+err.message);
  }
 
});

authRouter.post("/login",async(req,res)=>{

  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid=await user.validatePassword(password) ;
    if(isPasswordValid){
      const token= await user.getJWT();

      res.cookie("token",token,{ expires: new Date(Date.now() + 1*3600000), httpOnly: true });
      res.send(user);
    }
    else{
      res.send("Invalid Credentials");
    }

  }
   catch(err){
    res.status(400).send("Error saving the user  "+err.message);
  }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires :new Date(Date.now())

    });
    res.send("Logout successful");
})

module.exports=authRouter;
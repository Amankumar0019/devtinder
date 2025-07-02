const express = require("express");

const app = express();

//handle auth middleware for all get post .... requests

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user",userAuth,(req,res)=>{
  res.send("user data sent")
})
app.post("/iser/login",userAuth,(req,res)=>{
  res.send("user login successfully")
})

app.get("/admin/getALLData",(req,res)=>{
  res.send("All data sent");
});
app.get("/admin/deleteUser",(req,res)=>{
  res.send("Deleted User");
});
app.get("/getUserData",(req,res)=>{
  throw new Error("asjdlij");
  res.send("userdata sent");
  
})
app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("something went wrong");
  }
});



app.listen(3000, () => {
  console.log("Server is listing on port 3000...");
});

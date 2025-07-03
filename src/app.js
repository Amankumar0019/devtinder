const express = require("express");
const connectDB=require("./config/database")
const User=require("./models/user")
const app = express();

app.post("/signup",async(req,res)=>{

  const user= new User({
    firstName:"Virat",
    lastName:"Kholi",
    emailId:"viratkholi@gmail.com",
    password:"Virat@123"
  });

  try{
  await user.save();
  res.send("User Added successfully");
  }
  catch(err){
    res.statusMessage(400).send("Error saving the user"+err.message);
  }
 
});

connectDB().then(()=>{
    console.log("Database connected successfully");
    
app.listen(3000, () => {
  console.log("Server is listing on port 3000...");
});

})
.catch((err)=>{
    console.error("database cannot be connected");
});




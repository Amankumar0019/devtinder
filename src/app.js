const express = require("express");
const connectDB=require("./config/database")
const cookieParser= require("cookie-parser");
const app = express();
const cors =require("cors");

app.use(cors(
  {origin:"http://localhost:5173",
  credentials:true, // Allow cookies to be sent with requests
  }
))




app.use(express.json());
app.use(cookieParser()); 
const authRouter=require("./routes/Auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter); 
app.use("/",requestRouter);
app.use("/",userRouter)




connectDB().then(()=>{
    console.log("Database connected successfully");
    
app.listen(3000, () => {
  console.log("Server is listing on port 3000...");
});

})
.catch((err)=>{
    console.error("database cannot be connected");
});




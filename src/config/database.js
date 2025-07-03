const mongoose =require("mongoose");


const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://amankb7788:Aman2288466@cluster0.i3iowe5.mongodb.net/devTinder");
};

module.exports=connectDB;


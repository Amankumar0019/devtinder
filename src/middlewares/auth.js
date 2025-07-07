const jwt=require("jsonwebtoken");
const User=require("../models/user");

const userAuth=async(req,res,next)=>{
  try
  {const {token}=req.cookies;
  if(!token){
    return res.status(401).send("You are not logged in, please login again");
  }

  const decodedObj=await jwt.verify(token,"DEV@Tinder$790");
  const {_id}=decodedObj;
  const user=await User.findById(_id);
  if(!user){
    return res.status(401).send("User not found, please login again");
  }
  req.user=user; // Attach user to request object
  next()
 }
 catch(err){
    return res.status(401).send("Error"+err.message);
  }
};
module.exports={userAuth};
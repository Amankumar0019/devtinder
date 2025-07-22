const express=require("express");
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionRequest"); 
const User=require("../models/user");

const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try{
    const fromUserId=req.user._id; // ID of the user sending the request
    const toUserId=req.params.toUserId; // ID of the user receiving the request
    const status=req.params.status ;

    const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"Invalid status"});
    }
    const toUser=await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({message:"User not found"});
    }
    const existingConnectionRequest=await ConnectionRequest.findOne(
        {$or:[ {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            
            ]});

            if(existingConnectionRequest){
                return res.status(400).json({message:"Connection request already exists"});

            }
    const connectionReques= new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    })
   const data= await connectionReques.save();
   res.json({
    message:req.user.firstName +" is "+status +" in "+toUser.firstName,
    data: data
   }) 
}
catch(err){
    res.status(400).send("Error sending connection request: " + err.message);
}
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{

    try{
        const loogedInUser=req.user;
        const{status,requestId}=req.params;
        const allowedStatus =["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status"});
        }

        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loogedInUser._id,
            status:"interested"
        })
     
        if(!connectionRequest){
            return res.status(404).json({message:"Connection request not found  "});
        }
        connectionRequest.status=status;
       const data = await connectionRequest.save();
       res.json({
        message:"Connection request "+status ,data})

    }
    catch(err){
        res.status(400).send("Error reviewing connection request: " + err.message);
    }
})


module.exports=requestRouter;
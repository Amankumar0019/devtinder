const express =require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter=express.Router();
const ConnectionRequestModel=require("../models/connectionRequest");
const requestRouter = require("./request");
const User = require("../models/user");
const { connection } = require("mongoose");
const USER_SAFE_DATA="firstName lastName age gender about photoUrl"


userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
try{
    const loggedInUser=req.user;
    const connectionRequest=await ConnectionRequestModel.find({
        toUserId:loggedInUser._id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA)
    res.json({
        message:"Data fetched successfully",
        data:connectionRequest
    })
}
catch(err){
 res.status(400).send("Error fetching connection requests: " + err.message);
}

})

userRouter.get("/user/connections",userAuth,async(req,res)=>{

    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data=connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        console.log(connectionRequest)
        res.json({data})
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
})

userRouter.get("/feed",userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;

        limit=limit>50?50:limit; //limit should not be more than 50
        const skip=(page-1)*limit;

        //fid all the connectiopn request (sent +received)

        const connectionRequest= await ConnectionRequestModel.find({

            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId"); 
       const hideUserFromFeed =new Set();

       connectionRequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());

       })

       const users =await User.find({
        $and:[{_id:{$nin:Array.from(hideUserFromFeed)}}, //not in =>nin
        {_id:{  $ne:loggedInUser._id }},] //not equal =>ne

       }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);


    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})


module.exports=userRouter;
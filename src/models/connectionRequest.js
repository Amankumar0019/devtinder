const mongoose =require("mongoose");

const connectionRequestSchema =new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required:true

    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message: `{VALUE} is not a valid status`
        }
    }
},
{
    timestamps:true // This will add createdAt and updatedAt fields
}
);
connectionRequestSchema.index({fronUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send a connection request to yourself");
    }
    next();
})


const ConnectionRequestModel= new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports =ConnectionRequestModel;
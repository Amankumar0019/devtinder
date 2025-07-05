const mongoose=require("mongoose");

const userSchema =mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        minlength:4,
        maxlength:20,
    
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not correct");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skill:{
        type:[String],
    },
},
{
        timestamps:true,
    }

);

module.exports=mongoose.model("User",userSchema);

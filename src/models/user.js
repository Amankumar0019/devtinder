const mongoose=require("mongoose");
const validator =require("validator");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema =mongoose.Schema({
     firstName: {
    type: String,
    required: true,
    index: true,
    minlength: 4,
    maxlength: 20,
    // validate: {
    //   validator: function (value) {
    //     return /^[a-zA-Z0-9_]+$/.test(value);
    //   },
    //   message: "First name can only contain letters, numbers, and underscores."
    // }
  },
    lastName:{
        type:String,
         trim: true,
        maxLength: [25, "Last name too large"],
        match: /^[a-zA-Z]+$/,
    },
    emailId:{
        type:String,
        required:true,
        unique:true, 
        lowercase:true,
        trim:true,
        //   validate: [validator.isEmail, "Invalid email address"]
    },
    password:{
        type:String,
        required:true,
         validate: {
        validator: function (value) {
          return validator.isStrongPassword(value);
        },
        message:
          "Password is not strong",
      },
    },
    age:{
        type:Number,
        min:18,
        max:100,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not correct");
        //     }
        // }
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
        validate:{
            validator:function(){
                return this.skill.length <16;
            },
            message:"Too many Skills, make total skills less than or equal to 15"
        }
    },
},
{
        timestamps:true,
    }

);
userSchema.index({firstName:1,lastName:1});

userSchema.methods.getJWT=async function(){
    const user=this;

    const token=await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1h"});
    return token;
}

userSchema.methods.validatePassword=async function (passwordInputByUser){
    const user =this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;

}

module.exports=mongoose.model("User",userSchema);

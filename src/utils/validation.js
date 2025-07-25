const validator =require("validator");

const validateSignUpData=(req)=>{
    const { firstName, lastName, emailId, password }=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid !");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid !");
    }   else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough !");
    }
   
};

const validatesEditProfileData=(req)=>{

    const allowedEditFields=["firstName","lastName","about","age","gender","skill","photoUrl"];

    const isEditAllowed=Object.keys(req.body).every((field)=>allowedEditFields.includes(field) );

    return isEditAllowed;

}

module.exports={validateSignUpData,validatesEditProfileData };
const adminAuth=(req,res,next)=>{
  const token="xyz";
  const isAdminAuthorized=token=="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Unauthorized request");
  }
  else{
    next();
  }
};

const userAuth=(req,res,next)=>{
  const token="xyzdgrr";
  const isAdminAuthorized=token=="xyz";
  if(!isAdminAuthorized){
    res.status(401).send("Unauthorized request");
  }
  else{
    next();
  }
};
module.exports={adminAuth,userAuth};
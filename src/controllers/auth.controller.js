const {registerUser,loginUser,deleteAccount} = require('../services/auth.services');

const register = async (req,res)=>{
    const data = req.body;
    try{
    const userId = await registerUser(data);
    res.status(200).json({message:"User registered successfully", id:{userId}})
    }catch(err){
    res.status(400).json({message:"Bad request"})
    }
}


const login = async (req,res)=>{
    const cred = req.body;
  
    const jwtToken = await loginUser(cred.email,cred.password);
    if(!token){
        res.status(401).json({message:"Invalid Email or Password"});
    }else
        
  res.cookie("token", jwtToken, {
    httpOnly: true,
    sameSite: "none",
    secure: false
  });
      res.status(200).json({message:"Login successful",token: jwtToken})
}

const deleteUser = async (req,res)=>{
    const ID = req.params['userId'];
  
    const message = await deleteAccount(ID);
    if(!message){
        res.status(404).json({message:"User not found"});
    }else
      res.status(200).json({message:"User deleted successfully"});
}
    
module.exports = {register,login,deleteUser};
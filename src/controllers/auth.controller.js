const {registerUser,loginUser,deleteAccount} = require('../services/auth.services');

const register = async (req,res)=>{
    const data = req.body;
    const userId = await registerUser(data);
    res.status(200).json({message:"User Created", id:{userId}})
}

const login = async (req,res)=>{
    const cred = req.body;
  
    const token = await loginUser(cred.Email,cred.password);
    if(!token){
        res.status(401).json({message:"Invalid Email or Password"});
    }else
        res.cookie("token",token)
      res.status(200).json({message:"Login sucessfuly"})
}

const deleteUser = async (req,res)=>{
    const ID = req.params['userId'];
  
    const message = await deleteAccount(ID);
    if(!message){
        res.status(401).json({message:"Invalid Email or Password"});
    }else
      res.status(200).json({message:{message}});
}
    
module.exports = {register,login,deleteUser};
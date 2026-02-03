const {registerUser,loginUser} = require('../services/auth.services');

const register = async (req,res)=>{
    const data = req.body;
    const userId = await registerUser(data);
    res.status(200).json({message:"User Created", id:{userId}})
}

const login = async (req,res)=>{
    const cred = req.body;
  
    const userId = await loginUser(cred.email,cred.pass);
    if(!userId){
        res.status(401).json({message:"Invalid Email or Password"});
    }else
      res.status(200).json({message:"Login sucessfuly", id:{userId}})
}
    
module.exports = {register,login};
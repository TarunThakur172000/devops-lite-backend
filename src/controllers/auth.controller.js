const {registerUser,loginUser} = require('../services/auth.services');

const register = async (req,res)=>{
    const userId = await registerUser("test@gmail.com","test","pass");
    res.status(200).json({message:"User Created", id:{userId}})
}

const login = async (req,res)=>{
    const userId = await loginUser("test@gmal.com","pass");
    if(!userId){
        res.status(401).json({message:"Invalid Email or Password"});
    }else
      res.status(200).json({message:"Login sucessfuly", id:{userId}})
}
    
module.exports = {register,login};
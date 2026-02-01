const {registerUser} = require('../services/auth.services');
const register = async (req,res)=>{
    const userId = await registerUser("test@gmail.com","test","pass");
    res.status(200).json({message:"User Created", id:{userId}})
}

module.exports = {register};
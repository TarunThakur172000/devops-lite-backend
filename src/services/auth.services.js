const user = require('../models/User.modal');



const  registerUser = async (email,name,password)=>{
    try{
        const newUser = new user({email,name,password})
        const saveUser = await newUser.save();
        return saveUser.id;
    }catch(err){
        console.log(err);
    }
}

const loginUser = (email,password)=>{

}

module.exports = {registerUser,loginUser};
const user = require('../models/User.modal');
const projects = require('../models/projects.modal');
const Health = require('../models/Health.modal');


const  registerUser = async (data)=>{
    const {Email,name,Password} = data;
    try{
        const newUser = new user({
            email:Email,
            Name:name,
            password:Password})
        const saveUser = await newUser.save();
        return saveUser.id;
    }catch(err){
        console.log(err);
    }
}


const loginUser = async (Email,Password)=>{
    try{    
        const User = await user.findOne({email:Email});
       if(!User){
        return null;
       }
    if(User.password !== Password){
        return null;
    }

    return User.id;
        
    }catch(err){
        console.log(err);
    }

}

const deleteAccount = async (userId) =>{
    try{
        const deleteHealth = await Health.deleteMany({UserId : userId});
        const deleteProjcts = await projects.deleteMany({UserId : userId});
        const deleteUser = await user.findByIdAndDelete(userId); 
        return `${deleteHealth.deletedCount} health records & ${deleteProjcts.deletedCount} projects deleted. Account ${deleteUser ? "deleted" : "not found"}.`;

    }catch(err){
        console.log(err);
    }
}

module.exports = {registerUser,loginUser,deleteAccount};
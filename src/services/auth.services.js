const user = require('../models/User.modal');
const projects = require('../models/projects.modal');
const Health = require('../models/Health.modal');
const {createJwtToken} = require('../utils/jwt');

const  registerUser = async (data)=>{
    const {name,email,password} = data;
    console.log(email);
    try{
        const newUser = new user({
            Email:email,
            Name:name,
            Password:password})
        const saveUser = await newUser.save();
        return saveUser.id;
    }catch(err){
        console.log(err);
    }
}


const loginUser = async (email,password)=>{
    try{    
        const User = await user.findOne({Email:email});
       if(!User){
        return null;
       }
    if(User.Password !== password){
        return null;
    }
    const token = createJwtToken(User.id);
        
    return token;
        
    }catch(err){
        console.log(err);
    }

}


const deleteAccount = async (userId) => {
    try {
        
        const userProjects = await projects.find({ UserId: userId });

        let totalHealthDeleted = 0;

      
        for (const pro of userProjects) {
            const deleteHealth = await Health.deleteMany({projectID: pro._id });
            totalHealthDeleted += deleteHealth.deletedCount;
        }

    
        const deleteProjects = await projects.deleteMany({ UserId: userId });

    
        const deleteUser = await user.findByIdAndDelete(userId);

        return `${totalHealthDeleted} health records & ${deleteProjects.deletedCount} projects deleted. Account ${deleteUser ? "deleted" : "not found"}.`;

    } catch (err) {
        return false;
    }
};

module.exports = {registerUser,loginUser,deleteAccount};
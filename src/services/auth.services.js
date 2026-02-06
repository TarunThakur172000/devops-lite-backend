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

const deleteAccount = async (userId) => {
    try {
        
        const userProjects = await projects.find({ UserId: userId });

        let totalHealthDeleted = 0;

      
        for (const pro of userProjects) {
            const deleteHealth = await Health.deleteMany({ projectId: pro._id });
            totalHealthDeleted += deleteHealth.deletedCount;
        }

    
        const deleteProjects = await projects.deleteMany({ UserId: userId });

    
        const deleteUser = await user.findByIdAndDelete(userId);

        return `${totalHealthDeleted} health records & ${deleteProjects.deletedCount} projects deleted. Account ${deleteUser ? "deleted" : "not found"}.`;

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {registerUser,loginUser,deleteAccount};
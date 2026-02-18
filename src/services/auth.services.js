const user = require('../models/User.modal');
const projects = require('../models/projects.modal');
const Health = require('../models/Health.modal');
const {createJwtToken} = require('../utils/jwt');
const Dashboard = require('../models/Dashboard.modal');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { AppError } = require('../utils/AppError');
const tempEmailDomains = [
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com"
];

function isTemporaryEmail(email) {
  const domain = email.split("@")[1].toLowerCase();
  return tempEmailDomains.includes(domain);
}


/**
 * Generate a new recovery key for a user
 * @param {string} email
 * @returns {string} plain recovery key (user must save it)
 */
const generateRecoveryKey = async (email) => {
  const User = await user.findOne({ email: email.toLowerCase().trim() });
  if (!User) throw new Error("User not found");

  // Generate random key (32 characters)
  const key = crypto.randomBytes(16).toString('hex');

  // Hash the key before saving in DB
  User.recoveryKey = await bcrypt.hash(key, 10);
  await User.save();
  // Return plain key to show user
  return key;
};


const registerUser = async (data) => {
  const { name, email, password } = data;

  // Input validation
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  if (isTemporaryEmail(email)) {
    throw new AppError('Temporary emails are not allowed', 400);
  }

  const existingUser = await user.findOne({ email });
  if (existingUser) {
    throw new AppError('Email already registered', 409); // 409 = Conflict
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    email,
    name,
    password: hashedPassword
  });

  const saveUser = await newUser.save();

  // Create dashboard for new user
  const dashboard = new Dashboard({ userId: saveUser.id });
  await dashboard.save();

  const recoveryKey = await generateRecoveryKey(email);

  return { userId: saveUser.id, recoveryKey };
};


const loginUser = async (email,password)=>{
    
    try{    
        const User = await user.findOne({email});
       if(!User){
        return null;
       }
    const isMatch = await bcrypt.compare(password, User.password);
    if(!isMatch){
        return null;
    }
    const token = await createJwtToken(User.id);
        
    return token;
        
    }catch(err){
        console.log(err);
    }

}

const changePassword = async (userId, data) => {
    const {currentPassword, newPassword, confirmPassword} = data;
 
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirm password do not match");
  }

  // Find user
  const User = await user.findById(userId);
  if (!User) throw new Error("User not found");

  // Verify current password
  const isMatch = await bcrypt.compare(currentPassword, User.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  // Hash new password
  User.password = await bcrypt.hash(newPassword, 10);

  await User.save();
  return true;
};


const recoverPassword = async (data) => {
    const {email, recoveryKey, newPassword, confirmPassword} = data;
  if (!email || !recoveryKey || !newPassword || !confirmPassword) {
    throw new Error("All fields are required");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New password and confirm password do not match");
  }

  const User = await user.findOne({ email: email.toLowerCase().trim() });
  if (!User || !User.recoveryKey) throw new Error("Invalid recovery request");

  // Verify recovery key
  const isValidKey = await bcrypt.compare(recoveryKey, User.recoveryKey);
  if (!isValidKey) throw new Error("Invalid recovery key");

  // Hash new password
  User.password = await bcrypt.hash(newPassword, 10);

  // Clear old recovery key
  User.recoveryKey = undefined;

  await User.save();

  // Optional: generate a new recovery key for next use
  const newKey = await generateRecoveryKey(email);
  return { message: "Password reset successfully", nextRecoveryKey: newKey };
};




const deleteAccount = async (UserId) => {
    try {
        
        const userProjects = await projects.find({ userId: UserId });

        let totalHealthDeleted = 0;

      
        for (const pro of userProjects) {
            const deleteHealth = await Health.deleteMany({projectId: pro._id });
            totalHealthDeleted += deleteHealth.deletedCount;
        }

    
        const deleteProjects = await projects.deleteMany({ userId: UserId });

        const deleteDashBoard = await Dashboard.deleteMany({ userId: UserId });
        const deleteUser = await user.findByIdAndDelete(UserId);

        return `${deleteDashBoard} ${totalHealthDeleted} health records & ${deleteProjects.deletedCount} projects deleted. Account ${deleteUser ? "deleted" : "not found"}.`;

    } catch (err) {
        return false;
    }
};

module.exports = {registerUser,loginUser,deleteAccount,changePassword,recoverPassword};
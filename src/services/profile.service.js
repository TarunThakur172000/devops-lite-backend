const user = require('../models/User.modal');
const projects = require('../models/projects.modal');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const profileInfo = async (id) => {
  try {

    const userInfo = await user.findById(id).select('-password -recoveryKey -__v');
    if (!userInfo) {
      return { success: false, message: "User not found" };
    }

    const userProjects = await projects.find({ userId: new ObjectId(id) });

    // Calculate project stats summary
    const totalProjects = userProjects.length;
    const totalApiCalls = userProjects.reduce((sum, p) => sum + p.totalApiCalls, 0);
    const totalSuccess = userProjects.reduce((sum, p) => sum + p.totalSuccess, 0);
    const totalErrors = userProjects.reduce((sum, p) => sum + p.totalError, 0);

    const profile = {
      user: {
        id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        plan: userInfo.plan,
        subscriptionStatus: userInfo.subscriptionStatus,
        monthlyRequestLimit: userInfo.monthlyRequestLimit,
        createdAt: userInfo.createdAt
      },
      stats: {
        totalProjects,
        totalApiCalls,
        totalSuccess,
        totalErrors
      },
      projects: userProjects.map(project => ({
        id: project._id,
        projectName: project.projectName,
        apiKey: project.apiKey,
        totalApiCalls: project.totalApiCalls,
        totalSuccess: project.totalSuccess,
        totalError: project.totalError,
        numberOfEndpoints: project.numberOfEndpoints,
        totalResponseTime: project.totalResponseTime,
        createdAt: project.createdAt
      }))
    };

    return { success: true, profile };

  } catch (err) {
    console.log(err);
    return { success: false, message: "Server error" };
  }
};

module.exports = { profileInfo };
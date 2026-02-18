const Dashboard = require('../models/Dashboard.modal');

const getUserDashBoard = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    return Dashboard.find({ userId });
};

module.exports = { getUserDashBoard };

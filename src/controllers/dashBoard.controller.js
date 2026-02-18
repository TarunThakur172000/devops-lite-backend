const {getUserDashBoard} = require('../services/dashboard.service');
const getDashBoard = async (req, res, next) => {
    const id = req.userId;
   
    try {
        const metrics = await getUserDashBoard(id);

        res.status(200).json({
            message: "Metrics retrieved successfully",
            healthMetrics: metrics
        });

    } catch (err) {
        
        next(err);
    }
};


module.exports =  {getDashBoard};


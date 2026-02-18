const Health = require('../models/Health.modal');
const Projects = require('../models/projects.modal');
const Dashboard = require('../models/Dashboard.modal');

const updateHealthLog = async (data, projectId, userId) => {
  try {
   
    const quotaResult = await Dashboard.updateOne(
      { userId, remainingRequests: { $gt: 0 } },
      {
        $inc: {
          remainingRequests: -1,
          requestsUsedThisMonth: 1,
          totalRequests: 1,
          totalSuccess: data.success ? 1 : 0,
          totalErrors: data.success ? 0 : 1
        }
      }
    );

    if (quotaResult.modifiedCount === 0) {
      throw new Error("Monthly request limit reached");
    }

  
    const healthLog = await Health.create({
      projectId,
      timestamp: data.timestamp,
      responseTimeMs: data.responseTimeMs,
      endpoint: data.endpoint,
      statusCode: data.statusCode,
      method: data.Method,
      errorMessage: data.errorMessage,
      success: data.success,
      ip: data.ip,
      userAgent: data.userAgent
    });

 
    await Projects.updateOne(
      { _id: projectId },
      {
        
        $inc: {
          totalApiCalls: 1,
          totalResponseTime: data.responseTimeMs,
          ...(data.success
            ? { totalSuccess: 1 }
            : { totalErrors: 1 })
        }
      }
    );


    const dashboard = await Dashboard.findOne(
      { userId },
      { totalRequests: 1, totalErrors: 1 }
    );

    if (dashboard) {
      const errorRate =
        dashboard.totalRequests > 0
          ? Math.round(
              (dashboard.totalErrors / dashboard.totalRequests) * 100
            )
          : 0;
      await Dashboard.updateOne(
        { userId },
        { $set: { errorRate } }
      );
    }

    return healthLog._id;

  } catch (err) {
    console.error("Error saving health log or updating counters:", err);
    throw err;
  }
};

module.exports = { updateHealthLog };

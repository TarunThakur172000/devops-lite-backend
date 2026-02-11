const Health = require('../models/Health.modal');

const updateHealthLog = async (data, projectId) => {
  try {
    const healthLog = new Health({
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

    const saved = await healthLog.save();
    return saved._id;

  } catch (err) {
    console.error("Error saving health log:", err);
    throw err;
  }
};

module.exports = { updateHealthLog };

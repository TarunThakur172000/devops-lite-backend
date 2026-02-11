const mongoose = require('mongoose');
const Health = require('../models/Health.modal');

const getProjectMetrics = async (projectId, hours = 24) => {
  if (!projectId) return null;

  const since = new Date();
  since.setHours(since.getHours() - hours);

  try {
    const result = await Health.aggregate([
      {
        $match: {
          projectId: new mongoose.Types.ObjectId(projectId),
          createdAt: { $gte: since }
        }
      },
      {
        $group: {
          _id: null,
          apiCallCount: { $sum: 1 },
          errorCount: {
            $sum: {
              $cond: [{ $eq: ["$success", false] }, 1, 0]
            }
          },
          averageResponseTimeInMS: { $avg: "$responseTimeMs" }
        }
      }
    ]);

    if (!result.length) {
      return {
        apiCallCount: 0,
        errorCount: 0,
        averageResponseTimeInMS: 0,
        uptimePercentage: 100
      };
    }

    const m = result[0];

    return {
      apiCallCount: m.apiCallCount,
      errorCount: m.errorCount,
      averageResponseTimeInMS: Math.round(m.averageResponseTimeInMS),
      uptimePercentage: (
        ((m.apiCallCount - m.errorCount) / m.apiCallCount) * 100
      ).toFixed(2)
    };

  } catch (err) {
    console.error(err);
    throw err;
  }
};


const getHealthLogs = async (projectId, page, limit) => {
  if (!projectId) return null;

  const skip = (page - 1) * limit;

  try {
    const logs = await Health.find({ projectId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Health.countDocuments({ projectId });

    return {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: logs
    };

  } catch (err) {
    console.error(err);
    throw err;
  }
};



module.exports = {getProjectMetrics,getHealthLogs};
const { updateHealthLog } = require('../services/logs.service');

const updateHealth = async (req, res, next) => {
  try {
    const data = req.body;
    const projectId = req.projectid; 
    const userId = req.userId;

    if (!projectId || !userId) {
      const error = new Error('Project ID or User ID missing');
      error.statusCode = 400;
      throw error;
    }

    const healthId = await updateHealthLog(data, projectId, userId);

    res.status(200).json({
      status: 'success',
      healthId
    });

  } catch (err) {
    
    next(err);
  }
};

module.exports = { updateHealth };

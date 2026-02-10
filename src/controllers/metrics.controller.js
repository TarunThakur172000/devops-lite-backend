const {getProjectMetrics,getHealthLogs} = require('../services/metrics.service');



const gethealthmetrics = async (req, res) =>{
   const metrics =  await getProjectMetrics(req.params.projectId);
   res.status(200).json({message:"Metrics retrieved successfully",healthMetrics:metrics});
}


const gethealthlogs = async (req, res) =>{
   const logs =  await getHealthLogs(req.params.projectId);
   res.status(200).json({message:"Health logs retrieved successfully",healthLogs:logs});
}



module.exports = {gethealthmetrics,gethealthlogs};
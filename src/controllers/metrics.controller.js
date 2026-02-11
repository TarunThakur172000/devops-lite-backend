const {getProjectMetrics,getHealthLogs} = require('../services/metrics.service');
 


const gethealthmetrics = async (req, res) =>{
   try{
   const metrics =  await getProjectMetrics(req.params.projectId);
   res.status(200).json({message:"Metrics retrieved successfully",healthMetrics:metrics});
   }catch(err){
         res.status(500).json({message:"Server error"});
   }
}


const gethealthlogs = async (req, res) =>{
   const {page = 1, limit = 50} = req.query;
   try{
   const logs =  await getHealthLogs(req.params.projectId,page,limit);
   res.status(200).json({message:"Health logs retrieved successfully",healthLogs:logs});
      } catch(err){
         res.status(500).json({message:"Server error"});
      }
}



module.exports = {gethealthmetrics,gethealthlogs};
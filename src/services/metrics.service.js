const health = require('../models/Health.modal');

const averageTime = (data) =>{
    let avgTime = 0;
    for( const health of data){
        avgTime = avgTime + health.responsetime;
    }
    return (avgTime/data.length);
}

const errorCount = (data) =>{
     let count = 0;

    for(const health of data){
         if(health.api_error != null) 
            count = count + 1;            
    }
    return count;   
}

const getProjectMetrics = async (projectid)=>{

    if(!projectid) return;

    try{
        const data = await health.find({projectID:projectid})
       const res = {
        apiCallCount:data.length,
        errorCount: errorCount(data),
        averageResponseTimeInMS : averageTime(data),
       }
        return res;
    }
    catch(err){
        console.log(err);
    }

}

const getHealthLogs = async (projectid)=>{

    if(!projectid) return;
    
    try{
        const data = await health.find({projectID:projectid})
        return data;
    }
    catch(err){
        console.log(err);
    }

}


module.exports = {getProjectMetrics,getHealthLogs};
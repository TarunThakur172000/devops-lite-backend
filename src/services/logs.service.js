const health = require('../models/Health.modal');
// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;
const updateHealthLog = async (data,projectid)=>{
    const {
  responseTime = 0,
  api_End_Point = '',
  api_Status_Code = 200,
  api_Error = null,
  Method = 'GET'
} = data;

    try{ 
        const addHealth =  new health({
            projectID:projectid,
            responsetime: responseTime,
            api_end_point:api_End_Point,
            api_status_code:api_Status_Code,
            api_error:api_Error,
            method:Method
        })
        const newhealth = await addHealth.save()
        return newhealth.id;
    }catch(err){
        console.log(err);
    }
}

module.exports = {updateHealthLog};
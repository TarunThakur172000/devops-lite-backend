const mongoose = require('mongoose');
const {Schema} = mongoose;

const healthSchema = new Schema({
    projectID : {
        type:Schema.Types.ObjectId,
        ref:'projects',
    }, 
    responsetime : {type:Number},
    api_end_point : {type:String},
    api_status_code: {type:Number},
    api_error:{type:String},
    method:{type:String},
    created_at:{type:Date}
})

const Health = mongoose.model('Health',healthSchema);

module.exports = Health;
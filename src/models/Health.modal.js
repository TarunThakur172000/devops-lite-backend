const mongoose = require('mongoose');
const {Schema} = mongoose;

const healthSchema = new Schema({
    projectID : {
        type:Schema.Types.ObjectId,
        ref:Projects,
        required:true
    },
    responseTime : {type:number},
    api_end_point : {type:string},
    api_status_code: {type:number},
    api_error:{type:string},
    method:{type:string},
    created_at:{type:date}
})

const Health = mongoose.model('Health',healthSchema);

module.exports = Health;
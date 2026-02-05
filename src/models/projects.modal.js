const mongoose = require('mongoose');
const {Schema} = mongoose;

const projectSchema = new Schema({
    UserId : {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    },
    ProjectName:{type:String,required: true},
    api_key:{type:String},
    created_at:{type:Date}
})

const projects = mongoose.model('projects',projectSchema);

module.exports = projects;
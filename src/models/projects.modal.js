const mongoose = require('mongoose');
const {Schema} = mongoose;

const projectSchema = new Schema({
    userId : {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    },
    api_key: { type: String, required: true, unique: true },
    created_at:{type:date}
})

const projects = mongoose.model('projects',projectSchema);

module.exports = projects;
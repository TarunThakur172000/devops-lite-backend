const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  projectName: {
    type: String,
    required: true,
    trim: true
  },

  apiKey: {
    type: String,
    trim: true,
    unique: true
  },

  totalApiCalls: {
    type: Number,
    default: 0
  },

  totalSuccess: {
    type: Number,
    default: 0
  },

  totalError: {
    type: Number,
    default: 0
  },

   endpoints: {
    type: [String],   
    default: []       
  },

  numberOfEndpoints: {
    type: Number,
    default: 0
  },

  totalResponseTime: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;

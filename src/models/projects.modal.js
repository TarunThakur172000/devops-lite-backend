const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  apiKey: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;

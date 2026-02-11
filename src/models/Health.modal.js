const mongoose = require('mongoose');
const { Schema } = mongoose;

const healthSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'projects',
    required: true
  },

  timestamp: {
    type: Date,
    required: true
  },

  responseTimeMs: {
    type: Number,
    default: 0
  },

  endpoint: {
    type: String
  },

  statusCode: {
    type: Number
  },

  errorMessage: {
    type: String
  },

  method: {
    type: String
  },

  success: {
    type: Boolean
  },

  ip: {
    type: String
  },

  userAgent: {
    type: String
  }

}, { timestamps: true });

const Health = mongoose.model('Health', healthSchema);

module.exports = Health;

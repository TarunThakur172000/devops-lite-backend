const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true       
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  plan: {
  type: String,
  enum: ["Free", "Pro", "Enterprise"],
  default: "Free"
},
monthlyRequestLimit : {
  type: Number,
  default: 10000
},

subscriptionStatus: {
  type: String,
  enum: ["active", "canceled", "past_due"],
  default: "active"
},
recoveryKey: { type: String },        
},
{ timestamps: true }
);


const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;

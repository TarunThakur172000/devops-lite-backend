const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true       
  },
  Name: {
    type: String,
    trim: true
  },
  Password: {
    type: String,
    required: true
  },
},{ timestamps: true }
);


const User = mongoose.model('User', UserSchema, 'User');

module.exports = User;

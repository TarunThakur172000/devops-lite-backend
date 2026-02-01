const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema= new Schema({
    email : String,
    Name : String,
    password : String,
    created_at:{type:Date}
})
const user = mongoose.model(
  'User',
  UserSchema,
  'User',
);

module.exports = user;
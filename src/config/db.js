const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  await mongoose.connect(process.env.ENV_MONGO_String);
}
module.exports =connectDB;
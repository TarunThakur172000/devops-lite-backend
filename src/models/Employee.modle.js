const mongoose = require('mongoose');
const {Schema} = mongoose;

const NPPNEmployeeSchema = new Schema({
    Name : String,
    DOB : String
})

const EMP = mongoose.model(
  'Employee',
  NPPNEmployeeSchema,
  'Employess'
);

module.exports = EMP;
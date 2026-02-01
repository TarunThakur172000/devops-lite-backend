const authRoute = require('./routes/auth.routes');
const express = require('express');

const app = express();
app.use('/auth',authRoute);

module.exports = app;
const routes = require('./routes/basicRoutes');
const express = require('express');

const app = express();
app.use('/',routes);

module.exports = app;
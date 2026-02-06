const authRoute = require('./routes/auth.routes');
const projectRoute =  require('./routes/project.routes');
const logsRoute =  require('./routes/logs.routes');
const express = require('express');
const app = express();
app.use(express.json()); 
 
app.use('/auth',authRoute);

app.use('/project',projectRoute);
app.use('/logs',logsRoute);


module.exports = app;
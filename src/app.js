const authRoute = require('./routes/auth.routes');
const projectRoute =  require('./routes/project.routes');
const logsRoute =  require('./routes/logs.routes');
const express = require('express');
const { verifyToken } = require('./middleware/verifyToken');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  methods: '*',
  allowedHeaders: '*',
  credentials: true
}));
app.use(express.json()); 

app.use('/auth',authRoute);

app.use('/project',verifyToken,projectRoute);

app.use('/logs',logsRoute);


module.exports = app;
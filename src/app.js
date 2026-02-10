const authRoute = require('./routes/auth.routes');
const projectRoute =  require('./routes/project.routes');
const logsRoute =  require('./routes/logs.routes');
const metricsRoute =  require('./routes/metrics.routes');
const express = require('express');
const { verifyToken } = require('./middleware/verifyToken');
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use('/getHealthLogs',metricsRoute);


module.exports = app;
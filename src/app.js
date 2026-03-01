const authRoute = require('./routes/auth.routes');
const projectRoute =  require('./routes/project.routes');
const logsRoute =  require('./routes/logs.routes'); 
const metricsRoute =  require('./routes/metrics.routes');
const dahboardRoute = require('./routes/dashBoard.routes');
const profileRoute = require('./routes/profile.routes');
const feedbackRoute = require('./routes/feedBack.routes');
const express = require('express');
const { verifyToken } = require('./middleware/verifyToken');
const { verif_Api_key } = require('./middleware/verifyApiKey');
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const apiHealth = require("api-health-middleware");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: 'https://api-health-middleware.netlify.app',    // frontend URL
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
})); 

app.use(
 apiHealth({
    apiKey: `${process.env.API_MONITORING_KEY}` 
  })
);

app.use(express.json()); 

app.use('/auth',authRoute);

app.use('/project',verifyToken,projectRoute);

app.use('/logs',verif_Api_key,logsRoute);

app.use('/getHealthLogs',verifyToken,metricsRoute);
app.use('/dashboard',verifyToken,dahboardRoute);
app.use('/profile',verifyToken,profileRoute)
app.use('/api',verifyToken,feedbackRoute);

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});



module.exports = app;
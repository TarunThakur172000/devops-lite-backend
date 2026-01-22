const routes = require('./routes/basicRoutes');
const express = require('express');

const app = express();
app.use('/',routes);
app.listen(5000,()=>console.log("running at 5000"))
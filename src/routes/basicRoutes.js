const express = require('express');
const createEMP = require('../services/testService');
const route = express.Router();

route.get('/create/:name/:dob',(req,res)=>{
    createEMP(req.params.name,req.params.dob);
    res.send("test")
});

module.exports=route;
const express = require('express');
const addNumber = require('../models/addNumber')
const route = express.Router();

route.get('/:a/:b',(req,res)=>{
    
    res.send(addNumber(req.params['a'],req.params['b']));
});

module.exports=route;
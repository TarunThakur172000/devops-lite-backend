const { getDashBoard } = require('../controllers/dashBoard.controller');
const express = require('express');
const router = express.Router();


router.get('/',getDashBoard);

module.exports = router;
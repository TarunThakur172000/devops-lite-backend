const {updateHealth} = require('../controllers/logs.controller');
const {verif_Api_key} = require('../middleware/verifyApiKey');
const express = require('express');
const router = express.Router();

router.post('/health',verif_Api_key,updateHealth);

module.exports = router;
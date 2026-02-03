const {create,get} = require('../controllers/project.controller');
const express = require('express');
const router = express.Router();

router.post('/',create);
router.get('/:projectId',get);

module.exports = router;
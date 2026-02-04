const {create,get,getAll} = require('../controllers/project.controller');
const express = require('express');
const router = express.Router();

router.post('/',create);
router.get('/:projectId',get);
router.get('/getProject/:UserId',getAll);

module.exports = router;
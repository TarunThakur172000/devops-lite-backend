const {create,get,getAll,deleteProject,updateAPI} = require('../controllers/project.controller');
const express = require('express');
const router = express.Router();

router.post('/',create);
router.post('/:projectId',updateAPI);
router.get('/:projectId',get);
router.get('/getProject/:UserId',getAll);
router.delete('/:projectId',deleteProject);

module.exports = router;    
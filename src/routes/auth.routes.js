const {register,login,deleteUser} = require('../controllers/auth.controller');
const {create} = require('../controllers/project.controller');
const express = require('express');
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.delete('/:userId',deleteUser);




module.exports = router;


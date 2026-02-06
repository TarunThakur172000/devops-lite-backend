const {register,login,deleteUser} = require('../controllers/auth.controller');
const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();


router.post('/register',register);
router.post('/login',login);

router.delete('/:userId',verifyToken,deleteUser);




module.exports = router;


const express = require('express');
const router = express.Router();
const { userRegister, getUser } = require('../controllers/UserRegister');

router.post('/userRegister', userRegister);
router.get('/getUser', getUser);

module.exports = router;

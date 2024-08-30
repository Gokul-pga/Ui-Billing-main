const express = require('express');
const { addIncome, addExistingAccount, Getincomehistory } = require('../controllers/AddIncome');


const router = express.Router();

router.post('/addIncome', addIncome);
router.post('/addexistingaccount', addExistingAccount);
router.get('/getincomehistory', Getincomehistory);
module.exports = router;
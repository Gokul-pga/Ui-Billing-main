const express = require('express');
const { addIncome, Getexpensehistory } = require('../controllers/AddExpence');

const router = express.Router();

router.post('/add', addIncome);
router.get('/getexpencehistory', Getexpensehistory);
module.exports = router;
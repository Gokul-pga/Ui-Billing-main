const express = require('express');
const { createbankaccount, Getbankdetails, updateAccountType, deleteBankAccount } = require('../controllers/BankAccount');
const router = express.Router();

router.post('/createbankacc', createbankaccount);
router.get('/getbankdetails', Getbankdetails);
router.post('/updateaccounttype', updateAccountType);
router.delete('/:id',deleteBankAccount)

module.exports = router;

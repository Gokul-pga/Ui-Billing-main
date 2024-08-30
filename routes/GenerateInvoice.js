const express = require('express');
const {addInvoice, getInvoice, getTotalGrossAmount, getInvoiceCount, getIncomingCashPerDay, getTotalPaidAmount, updatePaidStatus} = require('../controllers/GenerateInvoice');
const router = express.Router();

router.post('/addInvoice', addInvoice);
router.get('/getInvoice', getInvoice);
router.get('/getInvoicecount', getInvoiceCount);
router.get('/totalgrossamount', getTotalGrossAmount);
router.get('/getIncomingCashPerDay', getIncomingCashPerDay);
router.get('/totalpaidamount', getTotalPaidAmount);
router.post('/updatePaidStatus', updatePaidStatus);

module.exports = router;

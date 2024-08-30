const express = require('express');
const { updateCashFlow, updateTodayIncome, resetDailyValues, getHistoricalData } = require('../controllers/CashFlow');
const router = express.Router();

router.post('/updateCashFlow', updateCashFlow);




router.post('/updateIncome', updateTodayIncome);

router.post('/resetDailyValues', resetDailyValues);
router.get('/getHistoricalData', getHistoricalData); // Add route for historical data

module.exports = router;
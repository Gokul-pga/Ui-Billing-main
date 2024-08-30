const express = require('express');
const { getStockData, updateStockData } = require('../controllers/stockUpdate');
const router = express.Router();

// Route to get stock data
router.get('/getStockData/:productId', getStockData);

// Route to update stock data

router.post('/updateStockData/:productId', updateStockData);


module.exports = router;


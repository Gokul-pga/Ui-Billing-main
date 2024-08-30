const express = require('express');
const { shopBillCreate } = require('../controllers/ShopaddreddbillSchema');
const router = express.Router();

router.post('/shopbillcreate', shopBillCreate);

module.exports = router;

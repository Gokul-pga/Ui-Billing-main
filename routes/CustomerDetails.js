const express = require('express');
const { customerCreate, getCustomerDetails, updatePendingAmt, deleteCustomer } = require('../controllers/CustomerDetails');
const router = express.Router();

router.post('/customercreate', customerCreate);
router.post('/updatePendingAmt', updatePendingAmt);
router.get('/getcustomerdetails', getCustomerDetails);
router.delete('/:id',deleteCustomer)



module.exports = router;

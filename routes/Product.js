const express = require('express');
const { GetProduct, deleteProduct, productPost, updateProduct } = require('../controllers/Product');
const router = express.Router();

router.post('/postproduct', productPost);
router.get('/getProduct', GetProduct);
router.delete('/:id',deleteProduct)
router.post('/:id', updateProduct);


module.exports = router;

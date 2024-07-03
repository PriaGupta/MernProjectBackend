const express = require('express');
const { uploadProduct, getProducts,updateProduct,deleteProductById } = require('../controllers/productController');
const router = express.Router();

router.post('/uploadProduct', uploadProduct);
router.get('/product', getProducts);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProductById);
module.exports = router;

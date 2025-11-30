const express = require('express');
const router = express.Router();
const {addProduct,getProduct,getProducts,updateProduct,deleteProduct} = require('../controllers/productController')


router.post('/addProduct',addProduct);
router.get('/getProducts',getProducts);
router.get('/getProduct/:id',getProduct);
router.put('/updateProduct/:id',updateProduct);
router.put('/deleteProduct/:id',deleteProduct);


module.exports = router;
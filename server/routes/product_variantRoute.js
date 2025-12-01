const express = require('express');
const pv_router = express.Router();
const {addProductVariant,getProductVariant,getProductVariants,updateProductVariant,delProductVariant} = require('../controllers/product_variantController');


pv_router.post('/addPV',addProductVariant);
pv_router.get('/getPVS',getProductVariants);
pv_router.get('/getPV/:id',getProductVariant);
pv_router.put('/updatePV/:id',updateProductVariant);
pv_router.delete('/deletePV/:id',delProductVariant);


module.exports = pv_router;
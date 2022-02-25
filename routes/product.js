const express = require('express');
const handlers = require('../handlers/product');
const catchAsync = require('../utilities/catchAsync');
const {isLogin, isOwner} = require('../utilities/checkAuth')


const router = express.Router({ mergeParams: true });
router.get('/product', isLogin, catchAsync(handlers.getAllProduct));
router.post('/product', isLogin, isOwner, catchAsync(handlers.addNewProduct));
router.get('/product/:prodid', isLogin, isOwner, catchAsync(handlers.getProductByID));
router.patch('/product/:prodid', isLogin, isOwner, catchAsync(handlers.updateProduct));
router.delete('/product/:prodid', isLogin, isOwner, catchAsync(handlers.removeProduct));


module.exports = router;
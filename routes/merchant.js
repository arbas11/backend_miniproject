const express = require('express');
const catchAsync = require('../utilities/catchAsync');
const handlers = require('../handlers/merchant');
const { isLogin, isOwner } = require('../utilities/checkAuth');

const router = express.Router();

router.get('/register', handlers.registerInstruction);
router.post('/register', catchAsync(handlers.registerMerchant));
router.get('/:id', isLogin, isOwner, catchAsync(handlers.getMerchantByid));
router.delete('/:id', isLogin, isOwner,  catchAsync(handlers.removeMerchant));

module.exports = router;
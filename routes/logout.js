const express = require('express');
const { logout } = require('../handlers/auth')

const router = express.Router();

router.post('/', logout);

module.exports = router
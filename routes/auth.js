const express = require('express');
const { login, loginInstruction} = require('../handlers/auth');

const router = express.Router();

router.get('/', loginInstruction);
router.post('/', login);

module.exports = router;
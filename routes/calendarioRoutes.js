const express = require('express');
const router = express.Router();
const calendario = require('../controllers/calendario');

router.get('/calendario', calendario);

module.exports = router;
const path = require('path');
const express = require('express');

const adsController = require('../controllers/ads');

const router = express.Router();

router.get('/', adsController.getIndex);

module.exports = router;

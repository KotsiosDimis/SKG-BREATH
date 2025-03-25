const express = require('express');
const router = express.Router();
const { getSkgAirData } = require('../controllers/airController');

router.get('/skg-air', getSkgAirData);

module.exports = router;
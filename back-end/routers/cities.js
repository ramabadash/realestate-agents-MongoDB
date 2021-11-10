const express = require('express');

const router = express.Router();

const { getAllCities } = require('../controller/agent');
// /cities

// Get all cities on DB
router.get('/', getAllCities);

module.exports = router;

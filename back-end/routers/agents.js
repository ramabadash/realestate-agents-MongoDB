const express = require('express');

const router = express.Router();

const { getAgentsByCity } = require('../controller/agent');
// /agents

// Get all agents with the city on the params
router.get('/', getAgentsByCity);

module.exports = router;

const express = require('express');

const router = express.Router();

const { updateCityById } = require('../controller/agent');
// /agent

// PUT  - will update agent's city by id
router.put('/:id/edit', updateCityById);

module.exports = router;

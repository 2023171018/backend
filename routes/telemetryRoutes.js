const express = require('express');
const router = express.Router();
const { saveTelemetry, getTelemetry } = require('../controllers/telemetryController');

router.post('/add', saveTelemetry);
router.get('/all', getTelemetry);

module.exports = router;

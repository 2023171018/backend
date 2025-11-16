const mongoose = require('mongoose');

const telemetrySchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Telemetry", telemetrySchema);

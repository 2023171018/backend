const Telemetry = require('../models/Telemetry');

exports.saveTelemetry = async (req, res) => {
    try {
        const data = await Telemetry.create(req.body);
        res.json({ message: "Datos guardados", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTelemetry = async (req, res) => {
    try {
        const data = await Telemetry.find().sort({ timestamp: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

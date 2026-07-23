const urjaClient = require("../services/urjaClient");

// GET /api/v1/meters
exports.getMeters = async (req, res) => {
    try {
        const data = await urjaClient.getMeters();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching meters:", err.message);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET /api/v1/meters/:id
exports.getMeterById = async (req, res) => {
    try {
        const data = await urjaClient.getMeterById(req.params.id);

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching meter:", err.message);

        res.status(404).json({
            success: false,
            message: err.message
        });
    }
};

// GET /api/v1/meters/:id/consumption
exports.getConsumption = async (req, res) => {
    try {
        const data = await urjaClient.getConsumption(req.params.id);

        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching consumption:", err.message);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
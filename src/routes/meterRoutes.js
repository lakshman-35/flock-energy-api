const express = require("express");

const router = express.Router();

const meterController = require("../controllers/meterController");

/**
 * @swagger
 * /api/v1/meters:
 *   get:
 *     summary: Get all smart meters
 *     tags:
 *       - Meters
 *     responses:
 *       200:
 *         description: List of meters
 */
router.get("/", meterController.getMeters);

/**
 * @swagger
 * /api/v1/meters/{id}:
 *   get:
 *     summary: Get a specific meter
 *     tags:
 *       - Meters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meter details
 */
router.get("/:id", meterController.getMeterById);

/**
 * @swagger
 * /api/v1/meters/{id}/consumption:
 *   get:
 *     summary: Get meter consumption history
 *     tags:
 *       - Consumption
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consumption history
 */
router.get("/:id/consumption", meterController.getConsumption);

module.exports = router;
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login to the Urja Portal
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

module.exports = router;
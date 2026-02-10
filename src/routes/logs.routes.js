const { updateHealth } = require('../controllers/logs.controller');
const { verif_Api_key } = require('../middleware/verifyApiKey');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /logs/health:
 *   post:
 *     summary: Update health logs
 *     tags: [Logs]
 *     security:
 *       - apiKeyAuth: []   # Indicates this endpoint requires an API key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status of the health check
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - status
 *               - timestamp
 *     responses:
 *       200:
 *         description: Health logs updated successfully
 *       401:
 *         description: missing API key
 *       403:
 *         description: Invalid API key
 *       400:
 *         description: Bad request
 */
router.post('/health', verif_Api_key, updateHealth);

module.exports = router;

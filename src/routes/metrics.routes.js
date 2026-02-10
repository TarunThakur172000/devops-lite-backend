const express = require('express');
const router = express.Router();
const { gethealthmetrics, gethealthlogs } = require('../controllers/metrics.controller');
const { verifyToken } = require('../middleware/verifyToken');

/**
 * @swagger
 * /getHealthLogs/{projectId}:
 *   post:
 *     summary: Get detailed health metrics for a project
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Metrics retrieved successfully
 */
router.post('/:projectId', verifyToken, gethealthmetrics);

/**
 * @swagger
 * /getHealthLogs/{projectId}:
 *   get:
 *     summary: Get API health logs for a project
 *     tags: [Health]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Health logs retrieved successfully
 */
router.get('/:projectId', verifyToken, gethealthlogs);

module.exports = router;

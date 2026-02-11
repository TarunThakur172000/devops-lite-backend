const express = require('express');
const router = express.Router();
const { gethealthmetrics, gethealthlogs } = require('../controllers/metrics.controller');


/**
 * @swagger
 * /getHealthLogs/metrics/{projectId}:
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
 *          description: Metrics retrieved successfully
 * 
 *       500:
 *          description: Server error
 */
router.get('/metrics/:projectId', gethealthmetrics);

/**
 * @swagger
 * /api/health/{projectId}:
 *   get:
 *     summary: Get API health logs for a project
 *     description: Returns paginated health logs for a specific project.
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of logs per page
 *
 *     responses:
 *       200:
 *         description: Health logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 120
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       projectId:
 *                         type: string
 *                       endpoint:
 *                         type: string
 *                       method:
 *                         type: string
 *                       statusCode:
 *                         type: integer
 *                       responseTimeMs:
 *                         type: number
 *                       success:
 *                         type: boolean
 *                       errorMessage:
 *                         type: string
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *
 *       400:
 *         description: Invalid project ID
 *
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 *       500:
 *         description: Server error
 */

router.get('/:projectId', gethealthlogs);

module.exports = router;

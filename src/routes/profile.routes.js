const {getProfile,  } = require('../controllers/profile.controller');
const express = require('express');

const router = express.Router();




router.get('/',getProfile);


/**
 * @swagger
 * /project/{projectId}:
 *   post:
 *     summary: Update project API details
 *     tags: [Project]
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
 *               apiKey:
 *                 type: string
 *                 description: New API key or config
 *               apiUrl:
 *                 type: string
 *                 description: New API endpoint URL
 *     responses:
 *       200:
 *         description: Project API updated successfully
 *       404:
 *         description: Project not found
 */






module.exports = router;

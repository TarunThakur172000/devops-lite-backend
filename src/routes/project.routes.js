const { create, get, getAll, deleteProject, updateAPI } = require('../controllers/project.controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the project
 *               description:
 *                 type: string
 *                 description: Project description
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', create);

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
router.post('/:projectId', updateAPI);

/**
 * @swagger
 * /project/getProjects:
 *   get:
 *     summary: Get all projects for a user
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: List of user's projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *       404:
 *         description: No projects found for user
 */
router.get('/getProjects', getAll);



/**
 * @swagger
 * /project/{projectId}:
 *   get:
 *     summary: Get details of a single project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Project details retrieved
 *       404:
 *         description: Project not found
 */
router.get('/:projectId', get);

/**
 * @swagger
 * /project/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/:projectId', deleteProject);

module.exports = router;

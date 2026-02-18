const { createProject, getProject, getProjects, deleteProject: deleteProjectService } = require('../services/project.service');
const { updateApi } = require('../services/api.service');

const create = async (req, res, next) => {
    try {
        const projectId = await createProject(req.body, req.userId);
        if (!projectId) {
            const error = new Error("Project could not be created");
            error.statusCode = 400;
            throw error;
        }
        res.status(201).json({ status: "success", projectId });
    } catch (err) {
        next(err);
    }
};

const get = async (req, res, next) => {
    try {
        const project = await getProject(req.params.projectId);
        if (!project) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: "success", project });
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const projects = await getProjects(req.userId);
        if (!projects.length) {
            const error = new Error("No projects found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: "success", projects });
    } catch (err) {
        next(err);
    }
};

const updateAPI = async (req, res, next) => {
    try {
        const newApi = await updateApi(req.params.projectId);
        if (!newApi) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: "success", newApi });
    } catch (err) {
        next(err);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const deletedProject = await deleteProjectService(req.params.projectId);
        if (!deletedProject) {
            const error = new Error("Project not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ status: "success", deletedProject });
    } catch (err) {
        next(err);
    }
};

module.exports = { create, get, getAll, deleteProject, updateAPI };

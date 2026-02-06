const projects = require('../models/projects.modal');

const verif_Api_key = async (req,res,next) =>{
    const apiKey =  req.headers['x-api-key'];
     if (!apiKey) return res.status(401).json({ success: false, message: 'API key missing' });
     const project = await projects.findOne({
api_key:apiKey});
 if (!project) return res.status(403).json({ success: false, message: 'Invalid API key' });

  req.projectid = project.id;
    next();
}

module.exports = {verif_Api_key};
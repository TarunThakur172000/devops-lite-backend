const project = require('../models/projects.modal');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const createProject = async (data) =>{
    
    const {userId, projectName} = data;
    try{
        const newProject =  new project({
               UserId:userId,
               ProjectName:projectName,
              });
        const Project = await newProject.save();
        return Project.id;
    }catch(err){
      console.log(err);
    }

} 

const getproject = async (projectId) =>{
    try{
        const projectDetail = await project.findById(projectId);
        return projectDetail;
    }catch(err){
        console.log(err);
    }
}

const getProjcts = async () =>{
    
}



module.exports = {createProject,getproject};
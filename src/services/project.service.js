const project = require('../models/projects.modal');
const {generate_Api} = require('./api.service');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


const createProject = async (data) =>{
    
    const {userId, projectName} = data;
    try{
        const api = generate_Api(); 
        console.log(api);
        const newProject =  new project({
               UserId:userId,
               ProjectName:projectName,
                api_key:api,
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

const getProjcts = async (userid) =>{  
    try{
        const allProjects = await project.find({UserId : new ObjectId(userid)});
        return allProjects;
    }catch(err){
        console.log(err);
    }
}

const deleteProjcts = async (projectId) =>{  
    try{
        const allProjects = await project.findByIdAndDelete(projectId);
        return allProjects;
    }catch(err){
        console.log(err);
    }
}


module.exports = {createProject,getproject,getProjcts,deleteProjcts};
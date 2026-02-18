const Dashboard = require('../models/Dashboard.modal');
const project = require('../models/projects.modal');
const {generate_Api} = require('./api.service');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;


const createProject = async (data,userId) =>{
    
    const {projectName} = data;
    try{
        const api = generate_Api(); 
        const newProject =  new project({
               userId,
             projectName,
                apiKey:api,
              });
        const Project = await newProject.save();

          const dashboardUpdate = Dashboard.updateOne(
              { userId },
              {
                $inc: {
                  totalProjects:1,  
                }
              }
            );

         await Promise.all([dashboardUpdate]);

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

const getProjcts = async (Userid) =>{  
    try{
        const allProjects = await project.find({userId : new ObjectId(Userid)});
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
const {createProject,getproject,getProjcts,deleteProjcts} = require('../services/project.service');
const {updateApi} = require('../services/api.service');



const create = async (req,res)=>{
    const data = req.body;
    const projectId = await createProject(data,req.userId);
    if(!projectId){
        res.status(400).json({message:"Bad request"});
    }else{
        res.status(201).json({message:"Project created successfully",projectid:{projectId}})
    } 
}


const get = async (req,res) =>{
     const projectId = await getproject(req.params['projectId']);
    if(!projectId){
        res.status(404).json({message:"No Project Found"});
    }else{
        res.status(200).json({message:"Success",projectid:{projectId}})
    } 
}

const getAll = async (req,res) =>{

    const UserId = req.userId;
    console.log(UserId);
    const allProjects = await getProjcts(UserId);
    if(!allProjects.length){
        res.status(404).json({message:"No Project Found"});
    }else{
        res.status(200).json({message:"Success",projects:{allProjects}})
    } 
}

const updateAPI = async (req,res) =>{
     const projectId = await updateApi(req.params['projectId']);
    if(!projectId){
        res.status(404).json({message:"Project not found"});
    }else{
        res.status(200).json({message:"API Updated",new_api : projectId});
    } 
}


const deleteProject = async (req,res) =>{
     const projectId = await deleteProjcts(req.params['projectId']);
    if(!projectId){
        res.status(404).json({message:"Project not found"});
    }else{
        res.status(200).json({message:"Project Deleted",projectid:{projectId}})
    } 
}

module.exports={create,get,getAll,deleteProject,updateAPI};
const {createProject,getproject,getProjcts} = require('../services/project.service');

const create = async (req,res)=>{
    const data = req.body;
    const projectId = await createProject(data);
    console.log(projectId);
    if(!projectId){
        res.status(500).json({message:"Something Went wrong I am working on it"});
    }else{
        res.status(200).json({message:"Project Created",projectid:{projectId}})
    } 
}


const get = async (req,res) =>{
     const projectId = await getproject(req.params['projectId']);
    if(!projectId){
        res.status(500).json({message:"Something Went wrong I am working on it"});
    }else{
        res.status(200).json({message:"Success",projectid:{projectId}})
    } 
}

const getAll = async (req,res) =>{
    const allProjects = await getProjcts(req.params['UserId']);
    if(!allProjects.length){
        res.status(500).json({message:"No Project Found"});
    }else{
        res.status(200).json({message:"Success",projects:{allProjects}})
    } 
}

module.exports={create,get,getAll};
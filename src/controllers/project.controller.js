const {createProject,getproject} = require('../services/project.service');

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
        res.status(200).json({message:"Project Created",projectid:{projectId}})
    } 
}

module.exports={create,get};
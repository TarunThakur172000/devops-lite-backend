const { updateApi, RevokeApi } = require('../services/api.service');
const {profileInfo} = require('../services/profile.service');


const getProfile = async (req,res,next)=>{
    try{
        const profile =  await profileInfo(req.userId);
        res.status(200).json({status:"success",profile});
    }catch(err){
        next(err);
    }
}

module.exports = {getProfile};
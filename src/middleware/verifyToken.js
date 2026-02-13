const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).json({message:"No Token provide"});
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({message:"Unauthorized"})
    }

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decode.data;
        
        next();
    }catch(err){
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {verifyToken};
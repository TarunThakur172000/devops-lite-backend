const jwt = require('jsonwebtoken');


const createJwtToken = (data) =>{

    const token = jwt.sign({userId:data},process.env.JWT_SECRET,{
        expiresIn : 60 * 60
    });
    return token;

}

module.exports = {createJwtToken}
const jwt = require('jsonwebtoken');


const createJwtToken = (data) =>{

    const token = jwt.sign({data},process.env.JWT_SECRET,{
        expiresIn : 15 * 60
    });
    return token;

}

module.exports = {createJwtToken}
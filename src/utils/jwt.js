const jwt = require('jsonwebtoken');


const createJwtToken = (data) =>{

    const token = jwt.sign({data},process.env.JWT_SECRET);
    return token;

}

module.exports = {createJwtToken}
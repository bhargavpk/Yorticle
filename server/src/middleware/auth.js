const jwt = require('jsonwebtoken');
const User = require('../../db/models/user');

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ' ,'');
        const decoded_token = jwt.verify(token, process.env.JWT_STRING);
        const user = await User.findOne({_id: decoded_token.id, tokens: token});
        if(!user)
            throw new Error();
        req.token = token;
        req.user = user;
        next();
    }catch(e){
        res.status(400).send({error:'Please authenticate!'});
    }
}

module.exports = auth;
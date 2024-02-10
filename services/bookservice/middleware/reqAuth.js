const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} req Request
 * @param {*} res Response
 */
const reqAuth = async (req,res,next) => {
    // Step 1 -- Verify Auth
    const { authorization } = req.headers;
    // Step 2 -- Check if there is no authorization
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'});
    }
    // [Bearer, asdasdaas]
    const token = authorization.split(" ")[1];
    // Step 3 Verify Token
    try{
        next();
    }catch(e){
        console.log(error);
        res.status(401).error({ error: "Request is not authorized" });
    }
}

module.exports = reqAuth;
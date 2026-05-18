const jwt = require('jsonwebtoken');
const {connectDb,closeDb} = require('../dbconnection');

const checkIfUserIdExists = async (id) => {
    let client = await connectDb();
    try {
        const checkQuery = `SELECT ID FROM "User"
        WHERE id = $1`;
        const values = [id];
        const result = await client.query(checkQuery, values);
        if(result.rowCount > 0){
            return true
        }
        else{
            return false;
        }
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await closeDb(client);
    }
}

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
        const { _id } = jwt.verify(token, process.env.SECRET);
        let idExists = await checkIfUserIdExists(_id);
        if(idExists){
            next();
        }
        else {
            res.status(401).json({error:"Request is not authorized"});
        }
        
    }catch(e){
        console.log(e);
        res.status(401).json({ error: "Request is not authorized" });
    }
}

module.exports = reqAuth;
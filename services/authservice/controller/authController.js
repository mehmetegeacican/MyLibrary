const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { addNewUser, checkIfUserExists } = require('../model/authModel');
dotenv.config();

/**
 * Creates Token
 * @param {*} id 
 * @returns 
 */
const createToken = (id) => {
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'1d'});
}

/**
 * Sign Up Request
 * @param {*} req 
 * @param {*} res 
 */
const signUp = async (req, res) => {
    const {email,password} = req.body;
    try {
        const id = await checkIfUserExists(email,password);
        if(id){
            res.status(400).json({message:"The email is already taken"});
        }
        else{
            const result = await addNewUser(email,password);
            const newId = await checkIfUserExists(email,password);
            const token = createToken(newId[0].id);
            res.status(201).json({result,email,token});
        }
       
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

/**
 * Login Request
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {

}
/**
 * Delete Request
 * @param {*} req 
 * @param {*} res 
 */
const sendDeleteReq = async (req, res) => {

}


module.exports = {
    signUp, login, sendDeleteReq
}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { addNewUser, checkIfUserExists, getIdOfUser } = require('../model/authModel');
dotenv.config();

/**
 * Creates Token
 * @param {*} id 
 * @returns 
 */
const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '1d' });
}

const SALT_ROUNDS = 5; // Number of rounds for salt generation

/**
 * Sign Up Request
 * @param {*} req 
 * @param {*} res 
 */
const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const id = await checkIfUserExists(email, password);
        if (id) {
            res.status(400).json({ message: "The email is already taken" });
        }
        else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const result = await addNewUser(email, hashedPassword);
            const id = await getIdOfUser(email);
            const token = createToken(id);
            res.status(201).json({ id, result, email, token });
        }

    } catch (e) {
        console.log(e);
        const message = "Db Connection unsuccessful"
        res.status(500).json({ error: message });
    }
}

/**
 * Login Request
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const ifExists = await checkIfUserExists(email, password);
        if (ifExists) {
            const val = await getIdOfUser(email);
            const id = val[0].id;
            const token = createToken(val[0].id);
            res.status(200).json({ id, email, token });
        }
        else {
            res.status(400).json({ message: "The user does not exist" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal Server Error" })
    }
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
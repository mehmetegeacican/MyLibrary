const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { addNewUser, checkIfUserExists, getIdOfUser, getUserById, updateUserPasswordById } = require('../model/authModel');
const { comparePasswords } = require('../utils/utils')
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
/**
 * PUT Request in order to change the password
 * @param {*} req 
 * @param {*} res 
 */
const changePassword = async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Missing required fields." });
    }

    try {

        const fetchedUsers = await getUserById(userId);
        if (!fetchedUsers || fetchedUsers.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        const user = fetchedUsers[0];

        const isMatch = await comparePasswords(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid current password." });
        }

        // Hash and Update
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        const resultMessage = await updateUserPasswordById(userId, hashedPassword);

        return res.status(200).json({ message: resultMessage });

    } catch (error) {
        console.error("ChangePassword Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


module.exports = {
    signUp, login, sendDeleteReq,
    changePassword
}
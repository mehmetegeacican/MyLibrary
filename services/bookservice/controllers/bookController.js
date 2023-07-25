const { executeGetAllBooks, executeGetSpecificBook } = require("../model/book");
const {validationResult} = require('express-validator');



/**
 * Gets a Book By its ID
 * @param {*} req 
 * @param {*} res 
 */
const getABookById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const theBook = await executeGetSpecificBook(res, id);
        res.send(theBook);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }

}

/**
 * Get All Books Logic Section
 * request
 * response 
 */
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await executeGetAllBooks(res);
        res.send(allBooks);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
}


module.exports = {
    getAllBooks,
    getABookById
}
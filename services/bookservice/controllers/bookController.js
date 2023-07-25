const { executeGetAllBooks, executeGetSpecificBook } = require("../model/book");
const {validationResult} = require('express-validator');


/**
 * Gets a Book By its ID
 * @param {*} req 
 * @param {*} res 
 */
const getABookById = async (req, res) => {
    try {
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        const theBook = await executeGetSpecificBook(id);
        res.send(theBook);
    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).send({ error: errorMessage });
    }

}

/**
 * Get All Books Logic Section
 * request
 * response 
 */
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await executeGetAllBooks();
        res.send(allBooks);
    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Connection Unsuccessful';
        res.status(500).send({ error: errorMessage });
    }
}


module.exports = {
    getAllBooks,
    getABookById
}
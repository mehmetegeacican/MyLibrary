const { executeGetAllBooks, executeGetSpecificBook } = require("../model/book");



/**
 * Gets a Book By its ID
 * @param {*} req 
 * @param {*} res 
 */
const getABookById = async (req, res) => {
    try {
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
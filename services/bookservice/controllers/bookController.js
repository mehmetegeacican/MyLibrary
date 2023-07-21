const { executeGetAllBooks } = require("../model/book");

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
        res.sendError(500);
    }
}


module.exports = {
    getAllBooks
}
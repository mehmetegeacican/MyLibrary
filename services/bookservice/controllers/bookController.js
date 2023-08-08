const { executeGetAllBooks, executeGetSpecificBook, executeInsertNewBook, executeFindABookByNameAndAuthor , executeUpdateBook} = require("../model/book");
const { validationResult } = require('express-validator');


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

/**
 * Controller Function to Add A new Book
 * @param {*} req the request  
 * @param {*} res the response 
 */
const addNewBook = async (req, res) => {
    try {
        //Step 1 -- Get the Variables 
        const { bookName, author, bookCategories, bookStatus } = req.body;
        //Step 2 -- Validation Result -- Check for Inputs         
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 3 -- Check if the Book Exists
        const ifAlreadyexists = await executeFindABookByNameAndAuthor(bookName,author);
        if(ifAlreadyexists.length > 0){
            return res.status(400).json({error:"The Book Already Exists in the db!"})
        }
        //Step 3 -- Insertion
        const result = await executeInsertNewBook(bookName, author, bookCategories, bookStatus);
        res.status(201).json({message:result});
    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).json({ error: errorMessage });
    }

};


/**
 * Controller Function to Update the Book
 * @param {*} req the request
 * @param {*} res the response 
 */
const updateABook = async (req,res) => {
    try{
        //Step 1 -- Get the Variables
        const {id} = req.params;
        const { bookName, author, bookCategories, bookStatus } = req.body;
        //Step 2 -- Validate the Variables
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 3 -- Check if the ID exist
        const ifIDDoesntExist = await executeGetSpecificBook(id);
        if(ifIDDoesntExist.length === 0){
            return res.status(400).json({error:"The ID does not exist!"});
        }
        //Step 4 -- Check if there is already a book with the same name and author in the system
        const bookByNameAndAuth = await executeFindABookByNameAndAuthor(bookName,author);
        if(bookByNameAndAuth.length > 0){
            return res.status(400).json({error:"There already is a book with the updated name and author"});
        }
        //Step 5 -- Edit the Id
        const result = await executeUpdateBook(id,bookName,author,bookCategories,bookStatus);
        res.status(200).json({message: result});
    }
    catch(e){
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).json({ error: errorMessage });
    }
};






module.exports = {
    getAllBooks,
    getABookById,
    addNewBook,
    updateABook
}
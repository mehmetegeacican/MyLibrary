
const { 
    executeGetAllBooks,
    executeGetSpecificBook, 
    executeInsertNewBook,
    executeFindABookByName,
    executeDeleteABookViaId, 
    executeUpdateBook 
} = require("../model/book");
const {
    getCache,
    setCache,
    clearCache
} = require("../redisconnection");
const { validationResult } = require('express-validator');


/**
 * Gets a Book By its ID
 * @param {*} req 
 * @param {*} res 
 */
const getABookById = async (req, res) => {
    try {
        // Step 0 -- Error
        const { id } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Step 1 -- Cache
        const cache = await getCache("books",id);
        if(cache){
            console.log("cache retrieved");
            return res.status(200).send(cache);
        }

        const theBook = await executeGetSpecificBook(id);
        await setCache("books",theBook,id);

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
        const {id} = req.params;
        // Step 1 -- Use the Cache If exists
        const cachedBooks = await getCache('books');
        if(cachedBooks){
            console.log("Cache Hit");
            return res.status(200).send(cachedBooks);
        }
        // Step 2 -- Use the DB and set the cache
        const allBooks = await executeGetAllBooks(id);
        await setCache('books', allBooks);
        
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
        const { bookName, desc, bookCategories, bookStatus, bookAuthors, userId, imagePath, language, liked, influence } = req.body;
        //Step 2 -- Validation Result -- Check for Inputs         
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 3 -- Check if the Book Exists
        const ifAlreadyexists = await executeFindABookByName(bookName,userId);
        if (ifAlreadyexists.length > 0) {
            return res.status(400).json({ error: "The Book Already Exists in the db!" })
        }
        //Step 3 -- Insertion
        const result = await executeInsertNewBook(bookName, desc, bookCategories, bookStatus,bookAuthors,userId,imagePath,language,liked,influence);
        //Step 4 -- Clear the Cache
        await clearCache("books");
        //Step 5 -- Return the Result
        res.status(201).json({ message: result });
    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).json({ error: errorMessage });
    }

};

/**
 * Controller Function to Delete A Book Via ID
 * @param {*} req the request 
 * @param {*} res the response
 */
const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        //Step 1 -- Validate the ID
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Step 2 -- Check if Id exist
        const book = await executeGetSpecificBook(id);
        if (book.length === 0) {
            return res.status(400).json({ error: "The Book with the given ID does not exist in the system!" });
        }
        //Step 2 -- Delete the Book
        const result = await executeDeleteABookViaId(id);
        // Step 3 -- Clear the Cache
        await clearCache('books');
        await clearCache(`books`,id);
        //Step 4 -- Return the Result
        res.status(200).json({ message: result });
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
        const { bookName, desc, bookCategories, bookStatus, bookAuthors, userId,imagePath, language, liked, influence } = req.body;
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
        const bookByNameAndAuth = await executeFindABookByName(bookName,userId);
        let filtered = bookByNameAndAuth.filter((item) => {
            return item.id !== id;
        });
        if(filtered.length > 0){
            return res.status(400).json({error:"There already is a book with the updated name and author"});
        }
        //Step 5 -- Edit the Id
        const result = await executeUpdateBook(id,bookName,desc,bookCategories,bookStatus,bookAuthors,imagePath,language,liked,influence);
        // Step 6 -- Clear the Cache
        await clearCache('books');
        await clearCache(`books`,id);
        //Step 7 -- Return the Result
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
    deleteABook,
    updateABook
}
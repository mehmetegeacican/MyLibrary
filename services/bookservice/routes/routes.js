const express = require("express");
const {
    getAllBooks,
    getABookById,
    addNewBook,
    deleteABook,
    updateABook
} = require('../controllers/bookController');
const {
    bookDataIDValidate,
    bookBodyValidate
} = require('../validators/book.validation');
const reqAuth = require('../middleware/reqAuth');



const router = express.Router();


// Middleware for Authentication
router.use(reqAuth);


//Routes
router.get("/all/:id", getAllBooks);
router.get("/:id", bookDataIDValidate(), getABookById);
router.post("/", bookBodyValidate(), addNewBook);
router.delete("/:id", bookDataIDValidate(), deleteABook);
router.put("/:id",bookDataIDValidate(),bookBodyValidate(),updateABook);



module.exports = router;
const express = require("express");
const {
    getAllBooks,
    getABookById,
    addNewBook,
    deleteABook
} = require('../controllers/bookController');
const {
    bookDataIDValidate,
    addNewBookValidate
} = require('../validators/book.validation');



const router = express.Router();


//Routes
router.get("/all", getAllBooks);
router.get("/:id", bookDataIDValidate(), getABookById);
router.post("/", addNewBookValidate(), addNewBook);
router.delete("/:id", bookDataIDValidate(), deleteABook);


module.exports = router;
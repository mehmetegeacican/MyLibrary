const express = require("express");
const {
    getAllBooks,
    getABookById,
    addNewBook
} = require('../controllers/bookController');
const {
    bookDataValidate,
    addNewBookValidate
} = require('../validators/book.validation');



const router = express.Router();


//Routes
router.get("/all", getAllBooks);
router.get("/:id", bookDataValidate(), getABookById);
router.post("/", addNewBookValidate(), addNewBook);


module.exports = router;
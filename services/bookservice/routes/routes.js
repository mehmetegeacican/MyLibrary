const express = require("express");
const {
    getAllBooks,
    getABookById,
    addNewBook,
    updateABook
} = require('../controllers/bookController');
const {
    bookDataIDValidate,
    bookBodyValidate
} = require('../validators/book.validation');



const router = express.Router();


//Routes
router.get("/all", getAllBooks);
router.get("/:id", bookDataIDValidate(), getABookById);
router.post("/", bookBodyValidate(), addNewBook);
router.put("/:id",bookDataIDValidate(),bookBodyValidate(),updateABook);


module.exports = router;
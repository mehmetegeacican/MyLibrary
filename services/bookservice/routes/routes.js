const express = require("express");
const {
    getAllBooks,
    getABookById
} = require('../controllers/bookController');
const {
    bookDataValidate
} = require('../validators/book.validation');



const router = express.Router();


//Routes
router.use("/all", getAllBooks);
router.use("/:id", bookDataValidate(), getABookById);


module.exports = router;
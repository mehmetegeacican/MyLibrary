const express = require("express");
const {
    getAllBooks,
    getABookById
} = require('../controllers/bookController');



const router = express.Router();


//Routes
router.use("/all", getAllBooks);
router.use("/:id", getABookById);


module.exports = router;
const express = require("express");
const {
    getAllBooks
} = require('../controllers/bookController');



const router = express.Router();


//Routes
router.use("/",getAllBooks);


module.exports = router;
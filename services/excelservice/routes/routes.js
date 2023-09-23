const express = require('express');
const { importCsvBooks } = require('../controller/csvController');



//Router
const router = express.Router();

//API Routes
router.post('/import/books',importCsvBooks);


module.exports = router;
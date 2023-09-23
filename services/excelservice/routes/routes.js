const express = require('express');
const { importCsvBooks,importCsvAuthors } = require('../controller/csvController');



//Router
const router = express.Router();

//API Routes
router.post('/import/books',importCsvBooks);
router.post('/import/authors',importCsvAuthors);

module.exports = router;
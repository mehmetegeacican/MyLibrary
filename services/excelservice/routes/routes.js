const express = require('express');
const { importCsvBooks,importCsvAuthors , importCsvCategories} = require('../controller/csvController');



//Router
const router = express.Router();

//API Routes
router.post('/import/books',importCsvBooks);
router.post('/import/authors',importCsvAuthors);
router.post('/import/categories',importCsvCategories);

module.exports = router;
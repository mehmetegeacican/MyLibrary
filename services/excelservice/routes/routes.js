const express = require('express');
const { importCsvBooks,importCsvAuthors , importCsvCategories} = require('../controller/csvController');
const reqAuth = require('../middleware/reqAuth');


//Router
const router = express.Router();
// Middleware
router.use(reqAuth);
//API Routes
router.post('/import/books',importCsvBooks);
router.post('/import/authors',importCsvAuthors);
router.post('/import/categories',importCsvCategories);

module.exports = router;
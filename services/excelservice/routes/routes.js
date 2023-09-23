const express = require('express');
const { importCsv } = require('../controller/csvController');



//Router
const router = express.Router();

//API Routes
router.post('/import',importCsv);


module.exports = router;
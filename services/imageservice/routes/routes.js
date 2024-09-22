const express = require('express');


const router = express.Router();

const { uploadImageRouter } = require('../controller/imageController');

// Define the route for uploading images
router.post('/uploadimg', uploadImageRouter);

module.exports = router;

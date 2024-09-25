const express = require('express');
const { upload } = require('../service/imageService');

const router = express.Router();

const { imageController } = require('../controller/imageController');

// Define the route for uploading images
router.post('/uploadimg', upload, imageController);

module.exports = router;

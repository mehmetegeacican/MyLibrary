const express = require('express');
const { upload } = require('../service/imageService');
const multer = require('multer');  // Import multer

const router = express.Router();

const { imageController } = require('../controller/imageController');

// Define the route for uploading images
router.post('/uploadimg',
    upload,
    (err, req, res, next) => {
        if (err instanceof multer.MulterError || err.message) {
            // Handle multer-specific errors or custom error messages
            return res.status(400).json({ error: err.message });
        }
        next();  // If validation passes, proceed to file upload
    },
    imageController
);

module.exports = router;

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer storage and file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const location = req.body.location || 'default'; // Get location from body (default if missing)
    const dir = `./images/${location}`;

    // Ensure that the directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir); // Save the image in the specified folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Name the file with timestamp
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false);
  }
};

// Set up multer middleware to handle both file and text fields
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
}).fields([{ name: 'image', maxCount: 1 }, { name: 'location', maxCount: 1 }]); // Specify fields for files


module.exports = {
  upload
}
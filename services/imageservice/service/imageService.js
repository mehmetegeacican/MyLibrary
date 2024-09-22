const multer = require('multer');
const path = require('path');

// Set up multer storage and file handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images'); // Destination folder for uploaded images
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

// Set up multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: fileFilter,
}).single('image'); // 'image' is the field name in the form data

// Service function to handle image upload
const uploadImage = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A multer error occurred when uploading
        resolve({ success: false, message: 'Multer error: ' + err.message });
      } else if (err) {
        // An unknown error occurred when uploading
        console.log("Here ");
        resolve({ success: false, message: 'Error: ' + err.message });
      } else {
        // Everything went fine
        if (!req.file) {
          resolve({ success: false, message: 'No file uploaded!' });
        } else {
          resolve({ success: true, filePath: req.file.path });
        }
      }
    });
  });
};

module.exports = {
    uploadImage
}

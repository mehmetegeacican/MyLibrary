const express = require('express');
const cors = require('cors');
const path = require('path');
const { upload } = require('./service/imageService');

const app = express();

const PORT = 4000;
const HOST = '0.0.0.0';

// Middleware to handle CORS and form data
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (form data)

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Image upload route
app.post('/api/v2/uploadimg', upload, (req, res) => {
  // Ensure there are no errors during the upload
  if (req.errors) {
    return res.status(400).json({ message: 'Error during upload', errors: req.errors });
  }

  // Access the uploaded image file and the location
  const file = req.files.image ? req.files.image[0] : null; // Image file
  const location = req.body.location; // Location string

  // Ensure a file was uploaded
  if (!file) {
    return res.status(400).json({ message: 'No image uploaded!' });
  }

  // Check for text field (location)
  if (!location) {
    return res.status(400).json({ message: 'Location not provided!' });
  }

  // Send success response
  return res.status(200).json({
    message: 'Image uploaded successfully!',
    filePath: file.path,
    location: location, // Include location in response
  });
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

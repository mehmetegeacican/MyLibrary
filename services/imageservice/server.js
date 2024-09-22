const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Set the port to listen on
const PORT = process.env.PORT || 3000;

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Default route for home
app.get('/', (req, res) => {
  res.send('Welcome to the static image hosting server. Access images at /images/<image_name>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

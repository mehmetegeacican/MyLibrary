const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./routes/routes');
const reqAuth = require('./middleware/reqAuth');

const app = express();

const PORT = 4000;
const HOST = '0.0.0.0';

// Middleware to handle CORS and form data
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (form data)



// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/v2/',router)

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

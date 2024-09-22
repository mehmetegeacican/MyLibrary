const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require("cors");
const router = require("./routes/routes");

dotenv.config();

const app = express();

const PORT = 4000;
const HOST = '0.0.0.0';

//Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'images' directory

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/v2",router);

// Start the server
app.listen(PORT,HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

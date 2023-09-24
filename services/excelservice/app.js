const express = require('express');
const multer = require('multer');
const app = express();
const cors = require("cors");
const router = require('./routes/routes');

const upload = multer({ dest: 'uploads/' }); // Destination folder for file uploads

//Middleware
app.use(cors());
app.use(express.json());
app.use(upload.single('csvFile'));


app.use('/api/v1/csv',router);

//Export
module.exports = app;
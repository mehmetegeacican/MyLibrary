const express = require('express');

const app = express();
const cors = require("cors");
const router = require('./routes/routes');



//Middleware
app.use(cors());
app.use(express.json());
app.use('api/v1/excel',router);

//Export
module.exports = app;
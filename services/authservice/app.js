const express = require('express');
const app = express();
const cors = require("cors");

//Middlewares
app.use(express.json());
app.use(cors());

module.exports = app;
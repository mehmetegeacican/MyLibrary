const express = require("express");
const app = express();
const cors = require("cors");
const routes = require('./routes/routes');

//MIDDLEWARE
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1/books",routes);
//Export
module.exports = app;
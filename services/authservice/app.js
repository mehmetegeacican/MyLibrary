const express = require('express');
const app = express();
const cors = require("cors");
const routes = require('./routes/authRoutes');

//Middlewares
app.use(express.json());
app.use(cors());
app.use('api/v1/auth',routes);

module.exports = app;
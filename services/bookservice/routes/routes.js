const express = require("express");


const router = express.Router();


//Routes
router.use("/",(req,res) => res.send("Hello There"));


module.exports = router;
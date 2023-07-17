const express = require("express");
const { executeGetAllBooks } = require("../model/book");


const router = express.Router();


//Routes
router.use("/",async (req,res) => res.send(await executeGetAllBooks()));


module.exports = router;
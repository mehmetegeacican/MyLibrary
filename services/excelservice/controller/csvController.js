const fs = require("fs");
const csvtojson = require('csvtojson');
const {isBook, insertDatasBooks, isAuthor, insertDatasAuthors, insertDatasCategories, isCategory} = require('../model/csvModel');






/**
 * This is the API for importing csv Books to the db
 * @param {*} req 
 * @param {*} res 
 */
const importCsvBooks = async  (req, res) => {
    let statuses;
    const filePath = req.file.path;
    const user_id = req.body.user_id;
    if (!filePath) {
        return res.status(400).json({ error: 'CSV data not provided.' });
    }
    try {
        //Step 1 -- Retrieving the Data as json 
        const jsonData = await csvtojson().fromFile(filePath);
        let jsonDataWithUserId = jsonData.map((data) => {
            return {...data,user_id:user_id};   
        });
        fs.unlinkSync(filePath); // Unlink, The Storage such as an S3 would be great for here
        // Step 2 -- Check which place to insert
        if(!isBook(jsonData[0])){
            return res.status(400).json({ error: 'CSV data type not in the correct format.' });
        }
        else{
            statuses = await insertDatasBooks(jsonDataWithUserId);
        } 
        // Step 3 -- send success status
        res.status(200).json({message:statuses})

    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        return res.status(500).json({ error: 'Db Access Unsuccessful' });
    }
};

const importCsvCategories = async (req,res) => {
    let statuses;
    const filePath = req.file.path;
    const user_id = req.body.user_id;
    if (!filePath) {
        return res.status(400).json({ error: 'CSV data not provided.' });
    }
    try {
        //Step 1 -- Retrieving the Data as json 
        const jsonData = await csvtojson().fromFile(filePath);
        let jsonDataWithUserId = jsonData.map((data) => {
            return {...data,user_id:user_id};   
        });
        fs.unlinkSync(filePath); // Unlink, The Storage such as an S3 would be great for here
        // Step 2 -- Check which place to insert
        if(!isCategory(jsonData[0])){
            return res.status(400).json({ error: 'CSV data type not in the correct format.' });
        }
        else{
            statuses = await insertDatasCategories(jsonDataWithUserId);
        } 
        // Step 3 -- send success status
        res.status(200).json({message:statuses})

    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).send({ error: 'Db Access Unsuccessful' });
    }
};

/**
 * This is the API for importing csv Books to the db
 * @param {*} req 
 * @param {*} res 
 */
const importCsvAuthors = async  (req, res) => {
    let statuses;
    const filePath = req.file.path;
    
    if (!filePath) {
        return res.status(400).json({ error: 'CSV data not provided.' });
    }
    try {
        //Step 1 -- Retrieving the Data as json 
        const user_id = req.body.user_id;
        const jsonData = await csvtojson().fromFile(filePath);
        let jsonDataWithUserId = jsonData.map((data) => {
            return {...data,user_id:user_id};   
        });
        fs.unlinkSync(filePath); // Unlink, The Storage such as an S3 would be great for here
        // Step 2 -- Check which place to insert
        if(!isAuthor(jsonData[0])){
            return res.status(400).json({ error: 'CSV data type not in the correct format.' });
        }
        else{
            statuses = await insertDatasAuthors(jsonDataWithUserId);
        } 
        // Step 3 -- send success status
        res.status(200).json({message:statuses})

    }
    catch (e) {
        console.log(e);
        const errorMessage = e.message || 'Db Access Unsuccessful';
        res.status(500).send({ error: 'Db Access Unsuccessful' });
    }
};



module.exports = {
    importCsvBooks,
    importCsvAuthors,
    importCsvCategories
}
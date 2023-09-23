const fs = require("fs");
const { parse } = require("csv-parse");
const csvtojson = require('csvtojson');
const {checkType, insertDatas} = require('../model/csvModel');






/**
 * This is the API for importing csv files to the db
 * @param {*} req 
 * @param {*} res 
 */
const importCsv = async  (req, res) => {
    let statuses;
    const filePath = req.file.path;
    if (!filePath) {
        return res.status(400).json({ error: 'CSV data not provided.' });
    }
    try {
        //Step 1 -- Retrieving the Data as json 
        const jsonData = await csvtojson().fromFile(filePath);
        fs.unlinkSync(filePath); // Unlink, The Storage such as an S3 would be great for here
        // Step 2 -- Check which place to insert
        if(checkType(jsonData[0]) === "undefined"){
            return res.status(400).json({ error: 'CSV data type not in the correct format.' });
        }
        else{
            statuses = insertDatas(jsonData);
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
    importCsv
}
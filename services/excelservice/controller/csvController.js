const fs = require("fs");
const { parse } = require("csv-parse");
const csvtojson = require('csvtojson');






/**
 * This is the API for importing csv files to the db
 * @param {*} req 
 * @param {*} res 
 */
const importCsv = async  (req, res) => {

    const filePath = req.file.path;
    if (!filePath) {
        return res.status(400).json({ error: 'CSV data not provided.' });
    }
    try {
        const jsonData = await csvtojson().fromFile(filePath);
        fs.unlinkSync(filePath); // Unlink, The Storage such as an S3 would be great for here
        res.status(200).json({message:jsonData})

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
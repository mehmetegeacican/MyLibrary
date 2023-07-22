const { connectDb, closeDb } = require('../dbconnection');
/**
 * Query Function to get All the Books
 * @param {*Pool} client 
 * @returns rows 
 */
const executeGetAllBooks = async (res) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const result = await client.query('SELECT * FROM books');
        data = result.rows;
        return data;
    }
    catch (e) {
        console.log(e);
        res.status(500).send({error:"Db Connection unsuccesful"})
    }
    finally{
        await closeDb(client);
    }
}

module.exports = {
    executeGetAllBooks
}
const {connectDb,closeDb} = require('../dbconnection');
/**
 * Query Function to get All the Books
 * @param {*Pool} client 
 * @returns rows 
 */
const executeGetAllBooks = async () => {
    try{
        //Step 1 -- Open the Db
        const client = await connectDb();
        //Step 2 -- Get the Result
        const result = await client.query('SELECT * FROM books');
        const data = result.rows;
        //Step 3 -- Close the Db and Return the data
        await closeDb(client);
        return data;
    }
    catch(e){
        console.log(e);
        throw new Error('Db Access Unsuccessful');
    }
    
}

module.exports = {
    executeGetAllBooks
}
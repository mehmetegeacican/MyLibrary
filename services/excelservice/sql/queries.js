const {connectDb,closeDb} = require('../dbConnection');
const dayjs = require('dayjs'); 
/**
 * Query Function the check if a book exist
 * @param {*string} bookName the book name
 * @param {*string} author the author
 * @returns 
 */
const queryFindABookByName = async (bookName,userId) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const checkQuery = `SELECT * FROM books WHERE UPPER(name) = UPPER($1) AND user_id = $2`;
        const values = [bookName,userId];
        const result = await client.query(checkQuery, values);
        data = result.rows;
        return data;
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await closeDb(client);
    }
}

/**
 * Query Function To Insert a New Book
 */
const queryInsertNewBook = async (bookName, description, bookCategories, bookStatus, bookAuthors,userId) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let date = dayjs().format('YYYY-MM-DD');
    /*
    const category = formatDatas(bookCategories);    
    const authors = formatDatas(bookAuthors);
    */
    console.log("Here at xecute Insert new book")
    try {
        //Step 2 -- Insert to the Table
        const insertQuery = `INSERT INTO books (name, description, entered, category, status,authors,user_id) VALUES($1, $2, $3, $4, $5,$6,$7)`;
        const values = [bookName, description, date, bookCategories, bookStatus,bookAuthors,userId];
        await client.query(insertQuery, values);
        return "Data Successfully inserted";
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        if(client){
            await closeDb(client);
        }
    }
};


module.exports = {
    queryFindABookByName,
    queryInsertNewBook
}
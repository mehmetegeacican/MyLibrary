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
 * Query to Check if an author exists
 * @param {*string} authorName 
 * @param {*number} userId 
 */
const queryFindAuthorByName = async (authorName,userId) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const checkQuery = `SELECT * FROM "Author" WHERE UPPER(name) = UPPER($1) AND user_id = $2`;
        const values = [authorName,userId];
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
/**
 * query to insert new author
 * @param {*string} authorName 
 * @param {*string} authorInfo 
 * @param {*number} userId 
 * @returns success message
 */
const queryInsertNewAuthor = async (authorName,authorInfo,userId) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    /*
    const category = formatDatas(bookCategories);    
    const authors = formatDatas(bookAuthors);
    */
    try {
        //Step 2 -- Insert to the Table
        const insertQuery = `INSERT INTO "Author" ("name", user_id, info) VALUES($1, $2, $3);`;
        const values = [authorName, userId, authorInfo];
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
    queryInsertNewBook,
    queryFindAuthorByName,
    queryInsertNewAuthor
}
const { connectDb, closeDb } = require('../dbconnection');
const dayjs = require('dayjs'); 
/**
 * Query Function to get All the Books
 * @param {*Pool} client 
 * @returns rows 
 */
const executeGetAllBooks = async (id) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const result = await client.query(`SELECT * FROM books WHERE user_id = ${id} ORDER BY ID ASC`);
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
 * Query Function to Get A Book Via It's ID
 * @param {*} id 
 */
const executeGetSpecificBook = async (id) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const result = await client.query(`SELECT * FROM books WHERE id = ${id}`);
        data = result.rows;
        return data;
    }
    catch (e) {
        console.log(e);
        throw new Error(`Db Connection unsuccesful, getABookById where id is ${id}`);
    }
    finally {
        await closeDb(client);
    }
}

/**
 * Query Function the check if a book exist
 * @param {*string} bookName the book name
 * @param {*string} author the author
 * @returns 
 */
const executeFindABookByName = async (bookName) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const checkQuery = `SELECT * FROM books WHERE UPPER(name) = UPPER($1)`;
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
 * Helper Function to Format the books based on the categories
 * @param {*string[]} bookCategories 
 */
const formatDatas = (bookDatas) => {
    let data = "{";
    bookDatas.forEach((element, index) => {
        let value = "";
        if (index === bookDatas.length - 1) {
            value = element;
        }
        else {
            value = element + ",";
        }
        data += value;
    });
    data += "}";
    return data;
};

/**
 * Query Function To Insert a New Book
 */
const executeInsertNewBook = async (bookName, description, bookCategories, bookStatus, bookAuthors) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let date = dayjs().format('YYYY-MM-DD');
    const category = formatDatas(bookCategories);    
    const authors = formatDatas(bookAuthors);
    console.log("Here at xecute Insert new book")
    try {
        //Step 2 -- Insert to the Table
        const insertQuery = `INSERT INTO books (name, description, entered, category, status,authors) VALUES($1, $2, $3, $4, $5,$6)`;
        const values = [bookName, description, date, category, bookStatus,authors];
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
 * Delete Via Id
 */
const executeDeleteABookViaId = async (id) => {
    let client = await connectDb();
    try {
        const deleteQuery = `DELETE FROM books WHERE id=$1`;
        const value = [id];
        await client.query(deleteQuery, value);
        return "Data Successfully deleted";
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
}
/**
 * Update Via Id
 * @param {*} id 
 * @param {*} bookName 
 * @param {*} author 
 * @param {*} bookCategories 
 * @param {*} bookStatus 
 * @returns 
 */
const executeUpdateBook = async (id,bookName,author,bookCategories,bookStatus,bookAuthors) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    try{
        const updateQuery = `UPDATE books SET "name"=$1, description=$2, category=$3, status=$4, authors = $5 WHERE id=$6`;
        const values = [bookName,author,formatDatas(bookCategories),bookStatus,formatDatas(bookAuthors),id];
        await client.query(updateQuery,values);
        return "Data Successfully updated";
    }
    catch(e){
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally{
        await closeDb(client);
    }
};


module.exports = {
    executeGetAllBooks,
    executeGetSpecificBook,
    executeInsertNewBook,
    executeFindABookByName,
    executeDeleteABookViaId,
    executeUpdateBook
}
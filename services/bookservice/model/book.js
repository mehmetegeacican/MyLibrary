const { connectDb, closeDb } = require('../dbconnection');
/**
 * Query Function to get All the Books
 * @param {*Pool} client 
 * @returns rows 
 */
const executeGetAllBooks = async () => {
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
const executeFindABookByNameAndAuthor = async (bookName, author) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const checkQuery = `SELECT * FROM books WHERE UPPER(name) = UPPER($1) AND UPPER(author) = UPPER($2)`;
        const values = [bookName, author];
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
const executeInsertNewBook = async (bookName, author, bookCategories, bookStatus) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let date = "2023-01-01";

    let category = "{";
    bookCategories.forEach((element, index) => {
        let value = "";
        if (index === bookCategories.length - 1) {
            value = element;
        }
        else {
            value = element + ",";
        }
        category += value;
    });
    category += "}";
    try {
        //Step 2 -- Insert to the Table
        const insertQuery = `INSERT INTO books (name, author, entered, category, status) VALUES($1, $2, $3, $4, $5)`;
        const values = [bookName, author, date, category, bookStatus];
        await client.query(insertQuery, values);
        return "Data Successfully inserted";
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await closeDb(client);
    }
};

module.exports = {
    executeGetAllBooks,
    executeGetSpecificBook,
    executeInsertNewBook,
    executeFindABookByNameAndAuthor
}
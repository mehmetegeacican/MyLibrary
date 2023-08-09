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
 * Helper Function to Format the books based on the categories
 * @param {*string[]} bookCategories 
 */
const formatCategories = (bookCategories) => {
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
    return category;
};

/**
 * Query Function To Insert a New Book
 */
const executeInsertNewBook = async (bookName, author, bookCategories, bookStatus) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let date = "2023-01-01";
    const category = formatCategories(bookCategories);    
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

const executeUpdateBook = async (id,bookName,author,bookCategories,bookStatus) => {
    //Step 1 -- Open the Db
    let client = await connectDb();
    let date = "2023-01-01";
    try{
        const updateQuery = `UPDATE books SET "name"=$1, author=$2, entered=$3, category=$4, status=$5 WHERE id=$6`;
        const values = [bookName,author,date,formatCategories(bookCategories),bookStatus,id];
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
    executeFindABookByNameAndAuthor,
    executeDeleteABookViaId,
    executeUpdateBook
}
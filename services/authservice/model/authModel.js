const { connectDb, closeDb } = require('../dbconnection');
/**
 * Model to Add A New User to The DB
 */
const addNewUser = async (username, password) => {
    let client = await connectDb();
    try {
        const insertQuery = `INSERT INTO "User"
        (username, "password")
        VALUES($1, $2)`;
        const values = [username,password];
        await client.query(insertQuery, values);
        return "Author Successfully inserted";
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
 * Model to Check If a User with the Username Password combination Exists
 */
const checkIfUserExists = async (username, password) => {
    let client = await connectDb();
    try {
        const checkQuery = `SELECT ID FROM "User"
        WHERE username = $1 AND password = $2`;
        const values = [username,password];
        const result = await client.query(checkQuery, values);
        if(result.rowCount > 0){
            return true
        }
        else{
            return false;
        }
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    }
    finally {
        await closeDb(client);
    }
}

const getIdOfUser = async (username) => {
    let client = await connectDb();
    try {
        const checkQuery = `SELECT ID FROM "User"
        WHERE username = $1`;
        const values = [username];
        const result = await client.query(checkQuery, values);
        return result.rows;
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
 * Model to Delete An Existing User from the DB
 */
const deleteUser = async (id) => {
    let client = await connectDb();
    let data;
    try {
    }
    catch (e) {

    }
    finally {
        await closeDb(client);
    }
}

module.exports = {
    addNewUser,
    checkIfUserExists,
    getIdOfUser
}


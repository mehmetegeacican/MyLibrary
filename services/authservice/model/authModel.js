const { connectDb, closeDb } = require('../dbconnection');
const bcrypt = require('bcrypt');
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
/**
 * Model to Check If a User with the Username Exists and Compare Passwords
 */
const checkIfUserExists = async (username, plainPassword) => {
    let client = await connectDb();
    try {
        // Query to fetch the hashed password
        const checkQuery = `SELECT ID, password FROM "User" WHERE username = $1`;
        const values = [username];
        const result = await client.query(checkQuery, values);

        if (result.rowCount > 0) {
            const user = result.rows[0]; // Fetch the user data
            const isMatch = await bcrypt.compare(plainPassword,user.password); // Compare passwords
            return isMatch ? true : false; // Return user ID if match, otherwise false
        } else {
            return false; // User does not exist
        }
    } catch (e) {
        console.log(e);
        throw new Error("Db Connection Unsuccessful");
    } finally {
        await closeDb(client);
    }
};


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


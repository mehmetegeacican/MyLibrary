const { connectDb, closeDb } = require('../dbconnection');
/**
 * Model to Add A New User to The DB
 */
const addNewUser = async (username, password) => {
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

/**
 * Model to Check If a User with the Username Password combination Exists
 */
const checkIfUserExists = async (username, password) => {
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


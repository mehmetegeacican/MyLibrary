const { queryFindABookByName, queryInsertNewBook, queryFindAuthorByName, queryInsertNewAuthor } = require('../sql/queries');
/**
 * Checks if the data is an author or not
 * @param {*object} jsonData 
 * @returns 
 */
const isAuthor = (jsonData) => {
    if ('authorName' in jsonData && 'authorDetails' in jsonData && 'user_id' in jsonData) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Checks if the data is an book or not
 * @param {*object} jsonData 
 * @returns 
 */
const isBook = (jsonData) => {
    if ('name' in jsonData
        && 'description' in jsonData && 'authors' in jsonData &&
        'user_id' in jsonData &&
        'entered' in jsonData &&
        'category' in jsonData &&
        'status' in jsonData) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * Checks whether it is category or not
 * @param {*object} jsonData 
 * @returns 
 */
const isCategory = (jsonData) => {
    if (
        "name" in jsonData &&
        "info" in jsonData &&
        "user_id" in jsonData) {
        return true;
    }
    else {
        return false;
    }
}


/**
 * Insertion mechanism here
 * @param {object[]} jsonDatas the JSON Array 
 */
const insertDatasBooks = async (jsonDatas) => {
    let statuses = {
        "inserted": 0,
        "failed": 0,
        "duplicate": 0
    }
    //Insert to Book Table
    //Step 1 -- Check if the book exists by name and userId
    for (const record of jsonDatas) {
        try {
            //Step 1 -- Check the Duplicates
            let isDuplicate = await queryFindABookByName(record.name, record.user_id);
            if (isDuplicate.length > 0) {
                statuses.duplicate++;
            }
            else {
                const data = await queryInsertNewBook(record.name, record.description, record.category, record.status, record.authors, record.user_id);
                if (data === "Data Successfully inserted") {
                    statuses.inserted++;
                }
            }
        }
        catch (e) {
            console.log("Could not insert", e);
            statuses.failed++;
        }

    }
    return statuses;
}

const insertDatasAuthors = async (jsonDatas) => {
    let statuses = {
        "inserted": 0,
        "failed": 0,
        "duplicate": 0
    }
    //Insert to Book Table
    //Step 1 -- Check if the book exists by name and userId
    for (const record of jsonDatas) {
        try {
            //Step 1 -- Check the Duplicates
            let isDuplicate = await queryFindAuthorByName(record.authorName, record.user_id);
            if (isDuplicate.length > 0) {
                statuses.duplicate++;
            }
            else {
                const data = await queryInsertNewAuthor(record.authorName, record.authorDetails, record.user_id);
                if (data === "Data Successfully inserted") {
                    statuses.inserted++;
                }
            }
        }
        catch (e) {
            console.log("Could not insert", e);
            statuses.failed++;
        }

    }
    return statuses;
}

module.exports = {
    insertDatasBooks,
    insertDatasAuthors,
    isBook,
    isAuthor
}
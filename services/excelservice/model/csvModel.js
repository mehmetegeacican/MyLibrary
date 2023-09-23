const {queryFindABookByName,queryInsertNewBook,queryFindAuthorByName} = require('../sql/queries');
/**
 * Checks if the data is an author or not
 * @param {*object} jsonData 
 * @returns 
 */
const isAuthor = (jsonData) => {
    if ('authorName' in jsonData && 'authorDetails' in jsonData && 'books' in jsonData) {
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
    else{
        return false;
    }
}
/**
 * Checks whether it is category or not
 * @param {*object} jsonData 
 * @returns 
 */
const isCategory = (jsonData) => {
    if(
    "name" in jsonData && 
    "info" in jsonData && 
    "user_id" in jsonData){
        return true;
    }
    else{
        return false;
    }
}
/**
 * Checks the type
 * @param {*object} exampleData 
 * @returns 
 */
const checkType = (exampleData) => {
    if(isBook(exampleData)){
        return "book";
    }
    else if(isCategory(exampleData)){
        return "category";
    }
    else if(isAuthor(exampleData)){
        return "author";
    }
    else{
        return "undefined";
    }
};

/**
 * Insertion mechanism here
 * @param {object[]} jsonDatas the JSON Array 
 */
const insertDatas = async  (jsonDatas) => {
    let statuses = {
        "inserted":0,
        "failed":0,
        "duplicate":0
    }
    if(checkType(jsonDatas[0]) === "book"){
        //Insert to Book Table
        //Step 1 -- Check if the book exists by name and userId
        for ( const record of jsonDatas) {
            try{
                //Step 1 -- Check the Duplicates
                let isDuplicate = await queryFindABookByName(record.name,record.user_id);
                if(isDuplicate.length > 0){
                    statuses.duplicate++;
                }
                else{
                    const data = await queryInsertNewBook(record.name,record.description,record.category,record.status,record.authors,record.user_id);
                    if(data === "Data Successfully inserted"){
                        statuses.inserted++;
                    }
                }
            }
            catch(e){
                console.log("Could not insert", e);
                statuses.failed++;
            }

        }
        return statuses;
    }
    else if (checkType(jsonDatas[0] === "author")){
        //Insert to Authors
        for(const record of jsonDatas){
            try{
                //Step 1 -- Check
                const isDuplicate = await queryFindAuthorByName(record.authorName,record.user_id);
                //Step 2 -- Insert
                if(isDuplicate.length > 0){
                    statuses.duplicate++;
                }
                else{
                    const data = await queryInsertNewAuthor(record.authorName,record.authorInfo,record.user_id);
                    if(data === "Data Successfully inserted"){
                        statuses.inserted++;
                    }
                }
            }
            catch(e){
                console.log("Could not insert", e);
                statuses.failed++;
            }
        }
    }
    else if(checkType(jsonDatas[0] === "category")){
        //Insert to Category
        for(const record of jsonDatas){
            try{
                //Step 1 -- Check
                //Step 2 -- Insert
            }
            catch(e){
                console.log("Could not insert", e);
                statuses.failed++;
            }
        }
    }
    return statuses;
}

module.exports = {
    checkType,
    insertDatas
}
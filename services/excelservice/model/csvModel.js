/**
 * Checks if the data is an author or not
 * @param {*object} jsonData 
 * @returns 
 */
const isAuthor = (jsonData) => {
    if ('id' in jsonData && 'authorName' in jsonData && 'authorDetails' in jsonData && 'books' in jsonData) {
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
    if ('id' in jsonData && 'name' in jsonData
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
    if("id" in jsonData && 
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
const insertDatas = (jsonDatas) => {
    let statuses = {
        "inserted":0,
        "failed":0,
        "duplicate":0
    }
    if(checkType(jsonDatas[0]) === "book"){
        //Insert to Book Table
    }
    else if (checkType(jsonDatas[0] === "author")){
        //Insert to Authors
    }
    else if(checkType(jsonDatas[0] === "category")){
        //Insert to Category
    }
    return statuses;
}

module.exports = {
    checkType,
    insertDatas
}
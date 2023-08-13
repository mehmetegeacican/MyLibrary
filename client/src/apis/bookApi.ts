import axios from "axios";


const PORT = 4000; //Env var should be used

const ADDRESS = `http://localhost:${PORT}`; // Env should be used

/**
 * Fetches the Books from the Db
 */
export const fetchAllBooks = async () => {
    try {
        const res = await axios.get(ADDRESS + '/api/v1/books/all');
        return res.data;
    }
    catch {
        return [];
    }
}
/**
 * Posts a New Book
 * @param requestBody 
 * @returns 
 */
export const postNewBook = async (requestBody:object) => {
    try{
        const res = await axios.post(ADDRESS + '/api/v1/books',requestBody);
        return res.data;
    }
    catch(e){
        return e;
        
    }
}
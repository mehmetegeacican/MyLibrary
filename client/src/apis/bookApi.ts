import axios from "axios";


const PORT = 4001; //Env var should be used

const ADDRESS = `http://localhost:${PORT}`; // Env should be used

/**
 * Fetches the Books from the Db
 */
export const fetchAllBooks = async () => {
    try{
        const res = await axios.get(ADDRESS + '/api/v1/books');
        return res.data;
    }   
    catch{
        return [];
    }
}
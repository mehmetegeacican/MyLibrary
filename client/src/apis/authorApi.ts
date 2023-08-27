import axios from "axios";
import.meta.env.VITE_AUTHORSERVICE_PORT;

const PORT = import.meta.env.VITE_AUTHORSERVICE_PORT;
const AUTHOR_ADDRESS = `http://localhost:${PORT}`;


/**
 * Fetches All of the Authors 
 * @returns The Category List
 */
export const fetchAllAuthors = async () => {
    try {
        const res = await axios.get(AUTHOR_ADDRESS + '/api/v1/authors/all');
        if(res){
            return res.data;
        }   
    }
    catch {
        return [];
    }
};
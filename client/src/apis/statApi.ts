import axios from "axios";

const PORT = import.meta.env.VITE_STATSERVICE_PORT;
const ADDRESS = `http://localhost:${PORT}`;

/**
 * the API FOR BookCount by Author
 * @returns The Book Count by author
 */
export const fetchAllBookCountsByAuthor = async () => {
    try {
        const res = await axios.get(ADDRESS + '/api/v1/stats/all/authors');
        return res.data;
    }
    catch {
        return [];
    }
}
/**
 * The API for Book Count by Category
 * @returns 
 */
export const fetchAllBookCountsByCategory = async () => {
    try{
        const res = await axios.get(ADDRESS + '/api/v1/stats/all/categories');
        return res.data;
    }
    catch{
        return [];
    }
}
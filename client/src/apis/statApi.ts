import axios from "axios";

const PORT = import.meta.env.VITE_STATSERVICE_PORT;
const ADDRESS = `http://localhost:${PORT}`;

/**
 * the API FOR BookCount by Author
 * @returns The Book Count by author
 */
export const fetchAllBookCountsByAuthor = async (userId:number) => {
    try {
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/authors/${userId}`);
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
export const fetchAllBookCountsByCategory = async (userId:number) => {
    try{
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/categories/${userId}`);
        return res.data;
    }
    catch{
        return [];
    }
}

/**
 * The API for Book Count by Stat
 * @returns 
 */
export const fetchAllBookCountsByStat = async (userId:number) => {
    try{
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/statuses/${userId}`);
        return res.data;
    }
    catch{
        return [];
    }
}
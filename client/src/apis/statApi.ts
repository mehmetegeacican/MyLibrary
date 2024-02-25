import axios from "axios";

const PORT = import.meta.env.VITE_STATSERVICE_PORT;
const ADDRESS = `http://localhost:${PORT}`;

/**
 * the API FOR BookCount by Author
 * @returns The Book Count by author
 */
export const fetchAllBookCountsByAuthor = async (userId:number,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/authors/${userId}`,config);
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
export const fetchAllBookCountsByCategory = async (userId:number,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/categories/${userId}`,config);
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
export const fetchAllBookCountsByStat = async (userId:number,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(ADDRESS + `/api/v1/stats/all/statuses/${userId}`,config);
        return res.data;
    }
    catch{
        return [];
    }
}
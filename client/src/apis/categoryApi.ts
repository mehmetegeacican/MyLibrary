import axios from "axios";

const PORT = import.meta.env.VITE_CATEGORYSERVICE_PORT;
const CATEGORY_ADDRESS = `http://localhost:${PORT}`;

/**
 * Fetches All of the Categories 
 * @returns The Category List
 */
export const fetchAllCategories = async () => {
    try {
        const res = await axios.get(CATEGORY_ADDRESS + '/api/v1/categories/all');
        if(res){
            return res.data;
        }   
    }
    catch {
        return [];
    }
};
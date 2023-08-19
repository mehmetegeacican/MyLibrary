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

/**
 * Adds A New Category
 * @param reqBody 
 * @returns 
 */
export const postNewCategory = async (reqBody:{name:string,info:string}) => {
    try{
        const res = await axios.post(CATEGORY_ADDRESS + '/api/v1/categories', reqBody);
        if(res){
            return res.data;
        }
    }
    catch(e){
        return e;
    }
}

/**
 * Updates an Existing Category
 * @param id the ID 
 * @param reqBody the request body
 * @returns 
 */
export const updateExistingCategory =async (id:number,reqBody:{name:string,info:string}) => {
    try{
        const res = await axios.put(CATEGORY_ADDRESS + `/api/v1/categories/${id}`,reqBody);
        return res.data;
    }
    catch(e){
        return e;
    }
}

/**
 * Deletes An Existing Category
 * @param id 
 * @returns 
 */
export const deleteExistingCategory = async (id:(number |string)) => {
    try{
        const res = await axios.delete(CATEGORY_ADDRESS + `/api/v1/categories/${id}`);
        return res.data;
    }
    catch(e){
        return e;
    }
};
import axios from "axios";

const PORT = import.meta.env.VITE_CATEGORYSERVICE_PORT;
const CATEGORY_ADDRESS = `http://localhost:${PORT}`;

/**
 * Fetches All of the Categories 
 * @returns The Category List
 */
export const fetchAllCategories = async (id:number,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(CATEGORY_ADDRESS + `/api/v2/categories/all/${id}`,config);
        if(res.status === 500){
            return [500];
        }
        return res.data;

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
export const postNewCategory = async (reqBody:{name:string,info:string, user_id:number},token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.post(CATEGORY_ADDRESS + '/api/v2/categories', reqBody,config);
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
export const updateExistingCategory =async (id:number,reqBody:{name:string,info:string},token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.patch(CATEGORY_ADDRESS + `/api/v2/categories/${id}`,reqBody,config);
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
export const deleteExistingCategory = async (id:(number |string), token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.delete(CATEGORY_ADDRESS + `/api/v2/categories/${id}`,config);
        return res.data;
    }
    catch(e){
        return e;
    }
};
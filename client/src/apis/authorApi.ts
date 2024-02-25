import axios from "axios";
import { IAuthor } from "../interfaces/DataInterfaces";
import.meta.env.VITE_AUTHORSERVICE_PORT;

const PORT = import.meta.env.VITE_AUTHORSERVICE_PORT;
const AUTHOR_ADDRESS = `http://localhost:${PORT}`;


/**
 * Fetches All of the Authors 
 * @returns The Category List
 */
export const fetchAllAuthors = async (userId:number,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(AUTHOR_ADDRESS + `/api/v1/authors/all/${userId}`,config);
        if(res){
            const differentited: IAuthor[] = res.data.map((item:any) => {
                return {
                    id: item.id,
                    authorName: item.name,
                    authorDetails: item.info,
                    books : item.books ?? [],
                    user_id: userId
                }
            })
            return differentited ?? [];
        }   
    }
    catch {
        return [];
    }
};


/**
 * Posts a New Author
 * @param requestBody 
 * @returns 
 */
export const postNewAuthor = async (requestBody:object,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.post(AUTHOR_ADDRESS + '/api/v1/authors',requestBody,config);
        return res.data;
    }
    catch(e){
        return e;
    }
}

/**
 * The API Function to delete authors 
 * @param id the id
 * @returns 
 */
export const deleteAnAuthor = async (id:string,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.delete(AUTHOR_ADDRESS + `/api/v1/authors/${id}`,config);
        return res.data;
    }
    catch(e){
        return e;
    }
}


/**
 * The API Function to update books
 * @param id The Id parameter
 * @param requestBody the request body
 * @returns the message or the errorv message
 */
export const updateAnAuthor =async (id:number,reqBody:{name:string,info:string,userId:number},token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.put(AUTHOR_ADDRESS + `/api/v1/authors/${id}`,reqBody,config);
        return res.data;
    }
    catch(e){
        return e;
    }
}
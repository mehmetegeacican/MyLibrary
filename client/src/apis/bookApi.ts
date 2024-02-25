import axios from "axios";
import.meta.env.VITE_BOOKSERVICE_PORT;

const PORT = 4001; //Env var should be used


const ADDRESS = `http://localhost:${PORT}`;

/**
 * Fetches the Books from the Db
 */
export const fetchAllBooks = async (userId: number, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };

        const res = await axios.get(ADDRESS + `/api/v1/books/all/${userId}`, config);
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
export const postNewBook = async (requestBody: object, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.post(ADDRESS + '/api/v1/books', requestBody,config);
        return res.data;
    }
    catch (e) {
        return e;

    }
}

/**
 * The API Function to delete books 
 * @param id the id
 * @returns 
 */
export const deleteABook = async (id: string,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.delete(ADDRESS + `/api/v1/books/${id}`,config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}
/**
 * The API Function to update books
 * @param id The Id parameter
 * @param requestBody the request body
 * @returns the message or the errorv message
 */
export const updateABook = async (id: string, requestBody: object,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.put(ADDRESS + `/api/v1/books/${id}`, requestBody,config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}
import axios from "axios";

const PORT = import.meta.env.VITE_NOTESERVICE_PORT;
const NOTE_ADDRESS = `http://localhost:${PORT}`;

/**
 * Function Required to Fetch All Notes of a User
 * @param id UserID
 * @param token JWT Authorization token
 */
export const fetchAllNotes = async (id:number,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(NOTE_ADDRESS + `/api/v2/notes/all/${id}`,config);
        if(res.status === 500){
            return [500];
        }
        return res.data;

    }
    catch {
        return [];
    }
}

/**
 * API function to post a new note
 * @param reqBody The Request Body for the new Note
 * @param token 
 * @returns 
 */
export const postNewNote = async (reqBody:object,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.post(NOTE_ADDRESS + '/api/v2/notes', reqBody,config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}

/**
 * API Function to update a new note
 * @param id The Note ID
 * @param reqBody Request Body
 * @param token Auth Token
 * @returns 
 */
export const updateNote = async (id:string,reqBody:object,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.put(NOTE_ADDRESS + `/api/v2/notes/${id}`, reqBody,config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}

/**
 * The Function Required to Delete A Note
 * @param id the Note Id
 * @param token The JWT Token
 * @returns 
 */
export const deleteNotes = async (id: string,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.delete(NOTE_ADDRESS + `/api/v2/notes/${id}`,config);
        return res.data;
    }
    catch (e) {
        return e;
    }
}


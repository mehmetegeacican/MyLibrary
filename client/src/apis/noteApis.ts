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


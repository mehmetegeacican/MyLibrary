import.meta.env.VITE_AUTHSERVICE_PORT;
import axios from "axios";

const PORT = import.meta.env.VITE_MINDMAPSERVICE_PORT;
const MINDMAP_ADDRESS = `http://localhost:${PORT}`;

/**
 * API to fetch all mindmaps
 * @param userId The User Id
 * @param token The authorization token
 * @returns 
 */
export const fetchAllMindMaps = async (userId: number, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                ownerId: userId
            }
        };
        const res = await axios.get(MINDMAP_ADDRESS + `/api/v3/mindmaps/all`, config);
        if (res.status === 200) {
            return res.data;
        }
        return;
    } catch {
        return [];
    }
}

/**
 * Fetches Mind Map By ID
 * @param id 
 * @param token 
 * @returns 
 */
export const fetchMindMapByID = async (id: string, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token },
        };
        const res = await axios.get(MINDMAP_ADDRESS + `/api/v3/mindmaps/${id}`, config);
        if (res.status === 200) {
            return res.data;
        }
        return;
    } catch {
        return [];
    }
}

/**
 * Posts New Mind Map
 * @param reqBody 
 * @param token 
 * @returns 
 */
export const createNewMindMap = async (userId: number, reqBody: object, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token },
            params: {
                ownerId: userId
            }
        };
        const res = await axios.post(MINDMAP_ADDRESS + '/api/v3/mindmaps', reqBody, config);
        return res.data;
    } catch (e) {
        return e;
    }
}

/**
 * Deletion Function for MindMap
 * @param id MindMap ID to delete 
 * @param token the user token 
 * @returns 
 */
export const deleteMindMapById = async (id: string, token: string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token },
        };
        const res = await axios.delete(MINDMAP_ADDRESS + `/api/v3/mindmaps/${id}`, config);
        if (res.status === 200) {
            return res.data;
        }
        return;
    } catch {
        return [];
    }
}
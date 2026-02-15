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
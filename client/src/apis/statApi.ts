import axios from "axios";

const PORT = import.meta.env.VITE_STATSERVICE_PORT;
const ADDRESS = `http://localhost:${PORT}`;

export const fetchAllBookCountsByAuthor = async () => {
    try {
        const res = await axios.get(ADDRESS + '/api/v1/stats/all');
        return res.data;
    }
    catch {
        return [];
    }
}
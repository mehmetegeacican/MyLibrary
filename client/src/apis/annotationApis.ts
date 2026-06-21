import axios from "axios";

const PORT = import.meta.env.VITE_NOTESERVICE_PORT;
const NOTE_ADDRESS = `http://localhost:${PORT}`;

export const fetchAllAnnotations = async (id:number,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(NOTE_ADDRESS + `/api/v2/annotations/all/${id}`,config);
        if(res.status === 500){
            return [500];
        }
        return res.data;

    }
    catch {
        return [];
    }
}
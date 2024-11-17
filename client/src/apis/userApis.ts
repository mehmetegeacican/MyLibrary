
import axios from "axios";

const PORT = import.meta.env.VITE_USERSERVICE_PORT;
const ADDRESS = `http://localhost:${PORT}`;

export const getUserById = async (id:string,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        const res = await axios.get(ADDRESS + `/api/v2/users/${id}`,config);
        return res.data[0] || {};
    } catch(e){

    }
}

export const updateUser = async (id:string,reqBody:object,token:string) => {
    try {
        const config = {
            headers: { 'Authorization': 'Bearer ' + token }
        };
        console.log(ADDRESS + `/api/v2/users/${id}`)
        const res = await axios.patch(ADDRESS + `/api/v2/users/${id}`, reqBody,config);
        return res.data;

    } catch(e){
        return e;
    }
}
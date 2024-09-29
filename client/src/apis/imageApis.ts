import axios from "axios";


const PORT = import.meta.env.VITE_IMAGESERVICE_PORT;
const IMAGE_ADDRESS = `http://localhost:${PORT}`;

/**
 * The UI Function to Upload Images
 * @param reqBody 
 * @param token 
 * @returns 
 */
export const postNewImage = async (reqBody:FormData,token:string) => {
    try{
        const config = {
            headers: { 'Authorization': 'Bearer ' + token },
            'Content-Type': 'multipart/form-data',
        };
        const res = await axios.post(IMAGE_ADDRESS + '/api/v2/uploadimg', reqBody,config);
        return res.data;

    } catch(e) {   
        return e;
    }
}
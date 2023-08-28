import axios from "axios";
import { IAuthor } from "../interfaces/DataInterfaces";
import.meta.env.VITE_AUTHORSERVICE_PORT;

const PORT = import.meta.env.VITE_AUTHORSERVICE_PORT;
const AUTHOR_ADDRESS = `http://localhost:${PORT}`;


/**
 * Fetches All of the Authors 
 * @returns The Category List
 */
export const fetchAllAuthors = async () => {
    try {
        const res = await axios.get(AUTHOR_ADDRESS + '/api/v1/authors/all');
        if(res){
            const differentited: IAuthor[] = res.data.map((item:any) => {
                return {
                    id: item.id,
                    authorName: item.name,
                    authorDetails: item.info,
                    books : item.books ?? [] 
                }
            })
            return differentited ?? [];
        }   
    }
    catch {
        return [];
    }
};
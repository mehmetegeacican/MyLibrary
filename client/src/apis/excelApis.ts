import.meta.env.VITE_EXCELSERVICE_PORT;
import axios from "axios";

const PORT = import.meta.env.VITE_EXCELSERVICE_PORT;
const EXCEL_ADDRESS = `http://localhost:${PORT}`;

/**
 * API to call the import books
 * @param file 
 * @returns 
 */
export const importBooksCSV = async (file:File) => {
    try{
        const res = await axios.post(EXCEL_ADDRESS + '/api/v1/csv/import/books',{
            csvFile:file
        });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
} 
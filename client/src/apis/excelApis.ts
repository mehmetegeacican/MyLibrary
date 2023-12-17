import.meta.env.VITE_EXCELSERVICE_PORT;
import axios from "axios";

const PORT = import.meta.env.VITE_EXCELSERVICE_PORT;
const EXCEL_ADDRESS = `http://localhost:${PORT}`;



/**
 * API to call the import books
 * @param file 
 * @returns 
 */
export const importBooksCSV = async (file:File,userId:number) => {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    formData.append('user_id',userId.toString());
    try{
        const res = await axios.post(EXCEL_ADDRESS + '/api/v1/csv/import/books',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
}

/**
 * API to call the import books
 * @param file 
 * @returns 
 */
export const importAuthorsCSV = async (file:File,userId:number) => {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    formData.append('user_id',userId.toString());
    try{
        const res = await axios.post(EXCEL_ADDRESS + '/api/v1/csv/import/authors',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
}

/**
 * API to call the import books
 * @param file 
 * @returns 
 */
export const importCategoriesCSV = async (file:File,userId:number) => {
    const formData = new FormData();
    formData.append('csvFile', file, file.name);
    formData.append('user_id',userId.toString());
    try{
        const res = await axios.post(EXCEL_ADDRESS + '/api/v1/csv/import/categories',formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
} 
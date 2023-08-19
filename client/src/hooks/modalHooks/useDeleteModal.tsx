import React from "react"
import { deleteABook } from "../../apis/bookApi";
import { deleteExistingCategory } from "../../apis/categoryApi";
import { ApiResult } from "../../interfaces/DataInterfaces";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";

export const useDeleteModal = () => {
    //Hooks
    const [error,setError] = React.useState<boolean>(false);
    const [success,setSuccess] = React.useState<boolean>(false);
    const [message,setMessage] = React.useState<string>("");
    const {dispatch,bookTrigger,categoryTrigger} = useLibraryDataContext();
    //Functions
    const processResult = (res: ApiResult) => {
        if(res.message && !res.response){
            setSuccess(true);
            setMessage(res.message);
            return true
        }
        else if(res.response!.status === 400){
            setError(true);
            return false
        }
        else if(res.response!.status === 500){
            setError(true);
            setMessage(res.response!.data!.error!);
            return false;
        }    
    }
    const deleteBook = async (id:number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteABook(stringId);
        const check = processResult(res);
        if(check){
            dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
        }
    }
    const deleteCategory = async ( id: number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteExistingCategory(stringId);
        console.log(res);
        const check = processResult(res);
        if(check){
            dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
        }
    }
    //Return Values
    return {deleteBook,deleteCategory,error,message,success};
}
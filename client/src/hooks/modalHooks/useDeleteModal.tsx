import React from "react"
import { deleteABook } from "../../apis/bookApi";
import { deleteExistingCategory } from "../../apis/categoryApi";
import { ApiResult } from "../../interfaces/DataInterfaces";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";
import { deleteAnAuthor } from "../../apis/authorApi";
import { useAuthContext } from "../contextHooks/useAuthContext";
import { deleteNotes } from "../../apis/noteApis";
import { isINote } from "../../components/tables/DataRow";

export const useDeleteModal = () => {
    //Hooks
    const {user} = useAuthContext();
    const [error,setError] = React.useState<boolean>(false);
    const [success,setSuccess] = React.useState<boolean>(false);
    const [message,setMessage] = React.useState<string>("");
    const {dispatch,bookTrigger,categoryTrigger, authorTrigger,noteTrigger} = useLibraryDataContext();
    //Functions
    const processResult = (res: ApiResult) => {
        if(res.message && !res.response){
            setSuccess(true);
            setMessage(res.message);
            return true
        }
        else if(!res.response){
            setSuccess(true);
            setMessage("Deleted Successfully");
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
        if(user){
            const res = await deleteABook(stringId,user.token);
            const check = processResult(res);
            if(check){
                dispatch({ type: 'TRIGGER_BOOKS', payload: !bookTrigger });
            }
        }
    }
    const deleteCategory = async ( id: number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteExistingCategory(stringId,user!.token);
        console.log(res);
        const check = processResult(res);
        if(check){
            dispatch({ type: 'TRIGGER_CATEGORIES', payload: !categoryTrigger });
        }
    }
    const deleteAuthor = async (id:number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteAnAuthor(stringId,user!.token);
        const check = processResult(res);
        if(check){
            dispatch({ type: 'TRIGGER_AUTHORS', payload: !authorTrigger });
        }
    }
    const deleteNote = async (id:number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteNotes(stringId,user!.token);
        const check = processResult(res);
        if(check){
            dispatch({ type: 'TRIGGER_NOTES', payload: !noteTrigger });
        }
    }
    //Return Values
    return {deleteBook,deleteCategory, deleteAuthor,deleteNote,error,message,success};
}
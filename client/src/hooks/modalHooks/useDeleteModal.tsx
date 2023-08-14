import React from "react"
import { deleteABook } from "../../apis/bookApi";

export const useDeleteModal = () => {
    //Hooks
    const [error,setError] = React.useState<boolean>(false);
    const [success,setSuccess] = React.useState<boolean>(false);
    const [message,setMessage] = React.useState<string>("");
    //Functions
    const deleteBook = async (id:number) => {
        let stringId = id.toString();
        //Step 0 -- Reset
        setError(false);
        setMessage("");
        setSuccess(false);
        //Step 1 -- Send the Result
        const res = await deleteABook(stringId);
        if(res.message && !res.response){
            setSuccess(true);
            setMessage(res.message);
        }
        else if(res.response.status === 400){
            setError(true);
        }
        else if(res.response.status === 500){
            setError(true);
            setMessage(res.response.data.error);
        }
    }
    //Return Values
    return {deleteBook,error,message,success};
}
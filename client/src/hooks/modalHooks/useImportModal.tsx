import React, { useEffect } from "react"
import { ApiResult } from "../../interfaces/DataInterfaces";
import { importBooksCSV, importCategoriesCSV , importAuthorsCSV} from "../../apis/excelApis";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";
import { useAuthContext } from "../contextHooks/useAuthContext";

interface IStatImport {
    inserted:number;
    failed:number;
    duplicate:number;
}

export const useImportModal = () => {
    //Hooks
    const [error,setError] = React.useState<boolean>(false);
    const [success,setSuccess] = React.useState<boolean>(false);
    const [status,setStatus] = React.useState<IStatImport>({
        inserted:0,
        failed:0,
        duplicate:0
    });
    const [message,setMessage] = React.useState<string>("");
    const {dispatch,bookTrigger,authorTrigger,categoryTrigger} = useLibraryDataContext();
    const {user} = useAuthContext();

    const init = () => {
        setError(false);
        setSuccess(false);
        setMessage("");
        setStatus({
            inserted:0,
            failed:0,
            duplicate:0
        })
    }
    //UseMemo
    useEffect(() => {
        if(success){
            setTimeout(() => {
                setSuccess(false);
            },4000);
        }
    },[success]);

    //Functions
    const processResult = (res: ApiResult) => {
        if(res && res.message && !res.response){
            setSuccess(true);
            setMessage(res.message);
            return true
        }
        else{
            return false;
        }
    }
    const importBooks = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importBooksCSV(file,user!.id,user!.token);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_BOOKS',payload:!bookTrigger})
        }
        else{
            setError(true);
            setMessage("Could not import the file, please check the file format or your connection")
        }
    };
    const importAuthors = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importAuthorsCSV(file,user!.id,user!.token);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_AUTHORS',payload:!authorTrigger})
        }
        else{
            setError(true);
            setMessage("Could not import the file, please check the file format or your connection")
        }
    }
    const importCategories = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importCategoriesCSV(file,user!.id,user!.token);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_CATEGORIES',payload:!categoryTrigger})
        }
        else{
            setError(true);
            setMessage("Could not import the file, please check the file format or your connection")
        }
    }
    //Return Values
    return {error,success,status,message,importBooks,importAuthors,importCategories}
}
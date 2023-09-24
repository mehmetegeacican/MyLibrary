import React, { useEffect } from "react"
import { ApiResult } from "../../interfaces/DataInterfaces";
import { importBooksCSV, importCategoriesCSV } from "../../apis/excelApis";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";

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
    const importBooks = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importBooksCSV(file);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_BOOKS',payload:!bookTrigger})
        }
    };
    const importAuthors = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importBooksCSV(file);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_AUTHORS',payload:!authorTrigger})
        }
    }
    const importCategories = async (file:File) => {
        //Step 1 -- Initialize
        init();
        //Step 2 -- Import
        const res = await importCategoriesCSV(file);
        const check = processResult(res);
        if(check){
            setSuccess(true);
            setStatus(res.message);
            dispatch({type:'TRIGGER_CATEGORIES',payload:!categoryTrigger})
        }
    }
    //Return Values
    return {error,success,status,message,importBooks,importAuthors,importCategories}
}
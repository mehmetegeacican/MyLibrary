import React from "react"
import { ApiResult } from "../../interfaces/DataInterfaces";
import { importBooksCSV } from "../../apis/excelApis";

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
        setError(false);
        setSuccess(false);
        setMessage("");
        setStatus({
            inserted:0,
            failed:0,
            duplicate:0
        })
        //Step 2 -- Import
        const res = await importBooksCSV(file);
        const check = processResult(res);
        if(check){
            setStatus(res.data.message);
        }
    };
    //Return Values
    return {error,success,status,message,importBooks}
}
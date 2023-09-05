import { log10 } from "chart.js/helpers";
import React from "react";
import { login } from "../../apis/authApis";
import { useAuthContext } from "../contextHooks/useAuthContext";

export const useAuthForms = () => {
    const [error,setError] = React.useState<boolean>(false);
    const [message,setMessage] = React.useState<string>("");
    const {dispatch} = useAuthContext();


    //Functions
    const loginUser = async (email:string,password:string) => {
        if(!email || !password){
            setError(true);
            setMessage("Email or Password can not be empty");
        }
        const result = await login(email,password);
        localStorage.setItem('user',JSON.stringify(result));
        dispatch({type:'LOGIN',payload:result});
    }
    return {error,message, loginUser}
    
 }
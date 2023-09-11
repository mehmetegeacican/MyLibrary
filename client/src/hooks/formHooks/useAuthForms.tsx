import React from "react";
import { login, signup } from "../../apis/authApis";
import { useAuthContext } from "../contextHooks/useAuthContext";

export const useAuthForms = () => {
    const [error,setError] = React.useState<boolean>(false);
    const [message,setMessage] = React.useState<string>("");
    const {dispatch} = useAuthContext();


    //Functions
    const loginUser = async (email:string,password:string) => {
        setError(false);
        setMessage("");
        if(!email || !password){
            setError(true);
            setMessage("Email or Password can not be empty");
        }
        const result = await login(email,password);
        localStorage.setItem('user',JSON.stringify(result));
        dispatch({type:'LOGIN',payload:result});
    };

    const signUpUser = async (email:string,password:string) => {
        setError(false);
        setMessage("");
        if(!email || !password){
            setError(true);
            setMessage("Email or Password can not be empty");
        }
        const result = await signup(email,password);
        localStorage.setItem('user',JSON.stringify(result));
        dispatch({type:'SIGN_UP',payload:result});
    };
    return {error,message, loginUser , signUpUser}
    
 }
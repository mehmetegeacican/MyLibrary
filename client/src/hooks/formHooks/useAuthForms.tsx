import React from "react";
import { login, signup, changePasswordByAPI } from "../../apis/authApis";
import { useAuthContext } from "../contextHooks";

export const useAuthForms = () => {
    const { user } = useAuthContext();
    const [error, setError] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const { dispatch } = useAuthContext();


    //Functions
    const loginUser = async (email: string, password: string) => {
        setError(false);
        setMessage("");
        if (!email || !password) {
            setError(true);
            setMessage("Email or Password can not be empty");
        }
        const result = await login(email, password);
        if (result.status === 400 || result.status === 429 || result.status === 500) {
            setError(true);
            const message = result.error || result.message;
            setMessage(message);
            return;
        }

        localStorage.setItem('user', JSON.stringify(result));
        dispatch({ type: 'LOGIN', payload: result });


    };

    const signUpUser = async (email: string, password: string) => {
        setError(false);
        setMessage("");
        if (!email || !password) {
            setError(true);
            setMessage("Email or Password can not be empty");
        }
        const signUpResult = await signup(email, password);
        const loginResult = await login(email, password);
        if (signUpResult.error) {
            setError(true);
            setMessage(signUpResult.message);
            return;
        }
        if (loginResult.error) {
            setError(true);
            setMessage(loginResult.message);
            return;
        }
        localStorage.setItem('user', JSON.stringify(loginResult));
        dispatch({ type: 'LOGIN', payload: loginResult });
    };

    const changeUserPassword = async (oldPassword: string, newPassword: string) => {
        if (user?.id) {
            const result = await changePasswordByAPI(user.id, {
                oldPassword,
                newPassword
            });
            if(result.status === 400 || result.status === 500){
                return {
                    status:result.status || 400,
                    message:result.message,
                    errors:result.errors
                }
            }
            return {
                message:result.message,
                status:200
            }

        }
    }
    return { error, message, loginUser, signUpUser,changeUserPassword }

}
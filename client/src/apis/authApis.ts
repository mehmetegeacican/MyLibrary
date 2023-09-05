import.meta.env.VITE_AUTHSERVICE_PORT;
import { IUser } from "../interfaces/DataInterfaces";
import axios from "axios";

const PORT = import.meta.env.VITE_AUTHSERVICE_PORT;
const AUTH_ADDRESS = `http://localhost:${PORT}`;

/**
 * API Function to Login As a User
 */
export const login = async (username:string,password:string) => {
    try{
        const res = await axios.post(AUTH_ADDRESS + '/api/v1/auth/login',{
            email:username,
            password:password
        });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
}
/**
 * API Function to Sign Up as a User
 */
export const signup = async (username:string,password:string) => {
    try{
        const res = await axios.post(AUTH_ADDRESS + '/api/v1/auth/signup',{
            email:username,
            password:password
        });
        return res.data ?? null;
    } catch(e){
        console.log(e)
        return null;
    }
}

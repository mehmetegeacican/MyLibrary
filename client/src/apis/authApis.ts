import.meta.env.VITE_AUTHSERVICE_PORT;
import axios from "axios";

const PORT = import.meta.env.VITE_AUTHSERVICE_PORT;
const AUTH_ADDRESS = `http://localhost:${PORT}`;

/**
 * API Function to Login As a User
 */
export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post(AUTH_ADDRESS + '/api/v1/auth/login', {
            email: username,
            password: password
        });
        //Local Storage can be moved to the useAuthForm Hook later
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data ?? null;
    } catch (e: any) {
        if (e.response) {
            return {
                error: e.response.data.message || "An error occurred",
                status: e.response.status
            };
        }
        return { error: "Network error. Is the server running?", status: 500 };
    }
}
/**
 * API Function to Sign Up as a User
 */
export const signup = async (username: string, password: string) => {
    try {
        const res = await axios.post(AUTH_ADDRESS + '/api/v1/auth/signup', {
            email: username,
            password: password
        });
        return res.data ?? null;
    } catch (e) {
        console.log(e)
        return null;
    }
}

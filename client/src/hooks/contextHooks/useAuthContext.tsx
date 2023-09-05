import { AuthDataContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthDataContext);
    if(!context){
        throw Error('useLibraryDataContext must be used inside an libraryDataContext Provider ')
    }
    return context;
}
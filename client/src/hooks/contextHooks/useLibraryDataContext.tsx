import { LibraryDataContext } from "../../contexts/LibraryDataContext";
import { useContext } from "react";

export const useLibraryDataContext = () => {
    const context = useContext(LibraryDataContext);
    if(!context){
        throw Error('useLibraryDataContext must be used inside an libraryDataContext Provider ')
    }
    return context;
}
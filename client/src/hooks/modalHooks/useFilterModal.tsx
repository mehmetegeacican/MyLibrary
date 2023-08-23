import { useEffect, useMemo } from "react";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";
import { IBook } from "../../interfaces/DataInterfaces";


interface FilterModalFormat {
    filters:string[];
}

export const useFilterModal = (filters:string[]) => {
    //Hooks
    const {books,categories} = useLibraryDataContext();

    const filteredBooks = useMemo(() => {
        return books.filter((item:IBook) => {
            return item.category.includes("Psychology");
        })
    },[filters]);

    useEffect(() => {
        console.log(filteredBooks,filters);
    },[filters]); 


    return {filteredBooks};
};
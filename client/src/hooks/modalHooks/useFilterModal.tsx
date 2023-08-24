import { useEffect, useMemo } from "react";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";
import { IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIBook } from "../../components/tables/DataRow";


export const useFilterModal = (filters:string[],tableDatas:IBook[] | ICategory[]) => {
    //Hooks
    const {books,categories} = useLibraryDataContext();

    /**
     * The Filter Function to set up the data
     * @param item 
     * @param filters 
     * @returns 
     */
    const filterBookByFilterInputs = (item:IBook,filters:string[]) => {
        for (const filter of filters) {
            let stat: string = filter.split("-")[0];
            let data: string = filter.split("-")[1];
            if (stat === "Name" && !item.name.includes(data)) {
                return false;
            } else if (stat === "Author" && !item.author.includes(data)) {
                return false;
            } else if (stat === "Status" && item.status !== data) {
                return false;
            } else if(stat === "Categories" && !item.category.includes(data)){
                return false;
            }
        }
        return true;
    };

    const filterDataByFilterInputs = (datas: IBook[] | ICategory[] , filters: string[]) => {
        if(datas && isIBook(datas[0])){
            const fd = books.filter((book:IBook) => {
                return filterBookByFilterInputs(book,filters);
            })
            return fd;
        }
        return datas;
    }



    return {filterDataByFilterInputs};
};
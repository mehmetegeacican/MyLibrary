import { useEffect, useMemo } from "react";
import { useLibraryDataContext } from "../contextHooks/useLibraryDataContext";
import { IAuthor, IBook, ICategory } from "../../interfaces/DataInterfaces";
import { isIAuthor, isIBook, isICategory } from "../../components/tables/DataRow";


export const useFilterModal = (filters:string[],tableDatas:IBook[] | ICategory[] | IAuthor[]) => {
    //Hooks
    const {books,categories,authors} = useLibraryDataContext();

    /**
     * The Filter Function to set up the books
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
            } else if (stat === "Author" && !item.authors.includes(data)) {
                return false;
            } else if (stat === "Status" && item.status !== data) {
                return false;
            } else if(stat === "Categories" && !item.category.includes(data)){
                return false;
            }
        }
        return true;
    };

    const filterAuthorsByFilterInputs = (item : IAuthor,filters: string[]) => {
        for (const filter of filters) {
            let stat: string = filter.split("-")[0];
            let data: string = filter.split("-")[1];
            if (stat === "Name" && !item.authorName.includes(data)) {
                return false;
            } 
        }
        return true;
    }

    const filterCategoriesByFilterInputs = (item:ICategory, filters:string[]) => {
        for (const filter of filters) {
            let stat: string = filter.split("-")[0];
            let data: string = filter.split("-")[1];
            if (stat === "Name" && !item.name.includes(data)) {
                return false;
            } 
        }
        return true;
    };

    const filterDataByFilterInputs = (datas: IBook[] | ICategory[] | IAuthor[] , filters: string[]) => {
        if(datas && isIBook(datas[0])){
            const fd = books.filter((book:IBook) => {
                return filterBookByFilterInputs(book,filters);
            })
            return fd;
        }
        else if(datas && isICategory(datas[0])){
            const fd = categories.filter((category:ICategory) => {
                return filterCategoriesByFilterInputs(category,filters);
            })
            return fd;
        }
        else if(datas && isIAuthor(datas[0])){
            const fd = authors.filter((author:IAuthor) => {
                return filterAuthorsByFilterInputs(author,filters);
            })
            return fd
        }
        return datas;
    }



    return {filterDataByFilterInputs};
};
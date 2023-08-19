import { ReactNode } from "react";
import { IBook, ICategory } from "./DataInterfaces";
/**
 * State Interfaces regarding the LibraryDataContext
 */
export interface LibraryDataState {
    books:IBook[];
    bookTrigger:boolean;
    categories: ICategory[];
    categoryTrigger:boolean;
    //Add possible others too
    //authors: IAuthor[] | null;
}
/**
 * Action Interface Regarding the LibraryDataContext
 */
export interface GetBooksAction {
    type: 'GET_BOOKS';
    payload: IBook[];
}
export interface TriggerBookInterface {
    type:'TRIGGER_BOOKS';
    payload:boolean;
}
export interface GetAuthorsAction {
    type: 'GET_AUTHORS';
    payload: IBook[];
}
export interface GetCategoriesAction {
    type:'GET_CATEGORIES';
    payload:ICategory[];
}
export interface TriggerCategoriesInterface {
    type:'TRIGGER_CATEGORIES';
    payload:boolean;
}
// Common Type for all the actions 
export type LibraryDataAction = (GetBooksAction | TriggerBookInterface | GetAuthorsAction | GetCategoriesAction | TriggerCategoriesInterface) ;
/**
 * Dispatch Interface required for dispatch function
 */
export interface LibraryDataContextType extends LibraryDataState {
    dispatch: React.Dispatch<LibraryDataAction>;
}

//Context Provider Interface
export interface LibraryDataContextProviderProps {
    children: ReactNode;
}
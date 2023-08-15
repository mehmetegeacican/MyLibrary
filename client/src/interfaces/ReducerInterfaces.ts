import { ReactNode } from "react";
import { IBook } from "./DataInterfaces";
/**
 * State Interfaces regarding the LibraryDataContext
 */
export interface LibraryDataState {
    books:IBook[];
    bookTrigger:boolean;
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
// Common Type for all the actions 
export type LibraryDataAction = (GetBooksAction | TriggerBookInterface | GetAuthorsAction ) ;
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
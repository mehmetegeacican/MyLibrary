import { ReactNode } from "react";
import { IAuthor, IBook, ICategory, INote, IUser } from "./DataInterfaces";
/**
 * State Interfaces regarding the LibraryDataContext
 */
export interface LibraryDataState {
    books:IBook[];
    bookTrigger:boolean;
    categories: ICategory[];
    categoryTrigger:boolean;
    authors: IAuthor[];
    authorTrigger: boolean;
    notes:INote[];
    noteTrigger:boolean;
    //Add possible others too
    //authors: IAuthor[] | null;
}

export interface AuthState {
    user:IUser | null
}
/**
 * Action Interface for Auth Context
 */
export interface LoginAction {
    type: 'LOGIN';
    payload: IUser;
}
export interface SignUpAction {
    type: 'SIGN_UP';
    payload: IUser;
}
export interface LogoutAction {
    type: 'LOG_OUT';
    payload: IUser | null;
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
    payload: IAuthor[] | [];
}
export interface TriggerAuthorsAction {
    type: 'TRIGGER_AUTHORS';
    payload: boolean;
}
export interface GetCategoriesAction {
    type:'GET_CATEGORIES';
    payload:ICategory[];
}
export interface TriggerCategoriesInterface {
    type:'TRIGGER_CATEGORIES';
    payload:boolean;
}

export interface GetNotesAction{
    type:'GET_NOTES';
    payload:INote[];
};


export interface TriggerNotesInterface{
    type:'TRIGGER_NOTES';
    payload:boolean;
};


// Common Type for all the actions 
export type LibraryDataAction = (GetBooksAction | 
    TriggerBookInterface | GetAuthorsAction | 
    TriggerAuthorsAction | GetCategoriesAction | TriggerCategoriesInterface
    | GetNotesAction | TriggerNotesInterface ) ;
export type AuthAction = (LoginAction | SignUpAction | LogoutAction);
/**
 * Dispatch Interface required for dispatch function
 */
export interface LibraryDataContextType extends LibraryDataState {
    dispatch: React.Dispatch<LibraryDataAction>;
}
export interface AuthContextType extends AuthState {
    dispatch: React.Dispatch<AuthAction>;
}

//Context Provider Interface
export interface LibraryDataContextProviderProps {
    children: ReactNode;
}
export interface AuthContextProviderProps {
    children:ReactNode;
}
import React, {createContext,useReducer,ReactNode } from "react";
import { IBook } from "../interfaces/DataInterfaces";

interface LibraryDataState {
    books:IBook[] | null;
    //Add possible others too
    //authors: IAuthor[] | null;
}

interface GetBooksAction {
    type: 'GET_BOOKS';
    payload: IBook[];
}

type LibraryDataAction = GetBooksAction;

// Define your context type
interface LibraryDataContextType extends LibraryDataState {
    dispatch: React.Dispatch<LibraryDataAction>;
}

//Context Provider Interface
interface LibraryDataContextProviderProps {
    children: ReactNode;
}


export const LibraryDataContext = createContext<LibraryDataContextType | undefined>(undefined);

/**
 * Reducer 
 * @param state 
 * @param action 
 * @returns 
 */
const libraryDataReducer = (state: LibraryDataState, action: LibraryDataAction) => {
    switch (action.type) {
      case 'GET_BOOKS':
        return { ...state, books: action.payload };
      // Add other cases for other actions here
      default:
        return state;
    }
};

export const LibraryDataContextProvider: React.FC<LibraryDataContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(libraryDataReducer, {
      books: null,
      // Initialize other state properties here
    });
  
    return (
      <LibraryDataContext.Provider value={{ ...state, dispatch }}>
        {children}
      </LibraryDataContext.Provider>
    );
  };

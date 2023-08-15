import React, {createContext,useReducer,ReactNode, useEffect, useCallback } from "react";
import { LibraryDataState, LibraryDataContextType, LibraryDataAction, LibraryDataContextProviderProps } from "../interfaces/ReducerInterfaces";
import { fetchAllBooks } from "../apis/bookApi";












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
      case 'TRIGGER_BOOKS':
        return {...state, bookTrigger: action.payload}; 
      default:
        return state;
    }
};

export const LibraryDataContextProvider: React.FC<LibraryDataContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(libraryDataReducer, {
      books: [],
      bookTrigger:false
      // Initialize other state properties here
    });

    const fetchInit = useCallback(async () => {
      const res = await fetchAllBooks();
      dispatch({type:"GET_BOOKS",payload:res})
    },[]);

    useEffect(() => {
      fetchInit();
    },[]);
  
    return (
      <LibraryDataContext.Provider value={{ ...state, dispatch }}>
        {children}
      </LibraryDataContext.Provider>
    );
  };

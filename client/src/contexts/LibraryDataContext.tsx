import React, {createContext,useReducer} from "react";
import { LibraryDataState, LibraryDataContextType, LibraryDataAction, LibraryDataContextProviderProps } from "../interfaces/ReducerInterfaces";














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
      case 'GET_CATEGORIES':
        return { ...state, categories: action.payload };
      case 'TRIGGER_CATEGORIES':
        return {...state, categoryTrigger: action.payload};
      case 'GET_AUTHORS':
        return {...state,authors: action.payload};
      case 'TRIGGER_AUTHORS':
        return {...state,authorTrigger: action.payload};
      case 'GET_NOTES':
        return {...state,notes: action.payload};
      case 'TRIGGER_NOTES':
        return {...state,noteTrigger: action.payload};
      default:
        return state;
    }
};

export const LibraryDataContextProvider: React.FC<LibraryDataContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(libraryDataReducer, {
      books: [],
      bookTrigger:false,
      categories:[],
      categoryTrigger:false,
      authors: [],
      authorTrigger:false,
      notes:[],
      noteTrigger:false
      // Initialize other state properties here
    });

    return (
      <LibraryDataContext.Provider value={{ ...state, dispatch }}>
        {children}
      </LibraryDataContext.Provider>
    );
  };

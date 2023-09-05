import { createContext, useEffect, useReducer } from "react";
import { AuthAction, AuthContextProviderProps, AuthContextType, AuthState } from "../interfaces/ReducerInterfaces";

export const AuthDataContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Reduceer
 */
/**
 * Reducer 
 * @param state 
 * @param action 
 * @returns 
 */
const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'LOGIN':
        return {...state, user: action.payload};
      case 'LOG_OUT':
        return {...state, user: null};
      case 'SIGN_UP':
        return {...state, user: action.payload};
      default:
        return state;
    }
};


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    useEffect(() => {
      //Parse the Local Storages json String
      const user = JSON.parse(localStorage.getItem('user') ?? "");
      //If this is present, then we have a user present, initial dispatch 
      if (user) {
          dispatch({ type: 'LOGIN', payload: user });
      }
  }, []);
    return (
        <AuthDataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthDataContext.Provider>

    );
}
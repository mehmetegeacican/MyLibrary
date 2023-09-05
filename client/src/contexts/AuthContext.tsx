import { createContext, useReducer } from "react";
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
    return (
        <AuthDataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthDataContext.Provider>

    );
}
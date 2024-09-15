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
      case 'SET_THEME_COLOR':
        return {...state, themeColor: action.payload};
      default:
        return state;
    }
};


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        themeColor:'secondary'
    });
    useEffect(() => {
      //Parse the Local Storages json String
      let userData;
      const user = localStorage.getItem('user');
      if(user){
        userData = JSON.parse(user);
      }
      //If this is present, then we have a user present, initial dispatch 
      if (user) {
          dispatch({ type: 'LOGIN', payload: userData });
      }
  }, []);
    return (
        <AuthDataContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthDataContext.Provider>

    );
}
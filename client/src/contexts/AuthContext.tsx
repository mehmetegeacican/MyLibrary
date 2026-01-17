import { createContext, useEffect, useReducer } from "react";
import { AuthAction, AuthContextProviderProps, AuthContextType, AuthState } from "../interfaces/ReducerInterfaces";
import { SUBSCRIPTION_METHOD } from "../enums/enums";
import { IUser } from "../interfaces/DataInterfaces";

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
      return { ...state, user: action.payload };
    case 'LOG_OUT':
      return { ...state, user: null };
    case 'SIGN_UP':
      return { ...state, user: action.payload };
    case 'SET_THEME_COLOR':
      return { ...state, themeColor: action.payload };
    case 'SET_PLAN':
      return { ...state, plan: action.payload };
    case 'INITIALIZE':
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};


export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    themeColor: 'secondary',
    plan: SUBSCRIPTION_METHOD.DEFAULT,
    isInitialized: false
  });


  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem('user') ?? "");
    if (rawData) {
      try {
        const signedInUser: IUser = {
          id: rawData?.id,
          email: rawData?.email,
          token: rawData?.token,
        }
        if (signedInUser) {
          dispatch({ type: 'LOGIN', payload: signedInUser });
          dispatch({ type: 'INITIALIZE' });
        }
      } catch (e: any) {
        dispatch({ type: 'INITIALIZE' });
      }
    }
    else {
      dispatch({ type: 'INITIALIZE' });
    }
  }, []);

  return (
    <AuthDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthDataContext.Provider>

  );
}